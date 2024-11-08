import "./ApplicationAddEdit.scss";
import {
  ApplicationEmploymentForms,
  ApplicationSeniorities,
  ApplicationStatuses,
  IApiApplication,
  IApplication,
  IApplicationEmploymentForm,
  IApplicationMode,
  IApplicationSeniority,
  IApplicationStatus,
} from "models/application";
import Select from "components/select/Select";
import { Icon } from "@iconify/react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TagInput from "components/tag-input/TagInput";
import { ApiAddApplication, ApiDeleteApplication, ApiGetApplication, ApiUpdateApplication } from "services/ApplicationsService";
import { MONTHS } from "models/constants";
import ConfirmModal from "components/confirm-modal/ConfirmModal";
import { useDispatch } from "react-redux";
import { ShowNotification } from "stores/NotificationReducer";
import Checkbox from "components/checkbox/Checkbox";

const numbers_regex = /^[1-9][0-9]*$/;

function ValidateApplication(data: IApplication): string | undefined {
  if (!data.position) {
    return "Please enter the position name!";
  } else if (!data.company) {
    return "Please enter the company name!";
  } else if (data.salaries.some((salary) => !numbers_regex.test(salary.min.toString()) || !numbers_regex.test(salary.max.toString()))) {
    return "Please enter a valid salary!";
  } else if (data.salaries.some((salary) => salary.min > salary.max)) {
    return "Minimum salary cannot be greater than maximum salary!";
  }
}

export default function ApplicationAddEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const EditMode = !!id;
  const [Submitting, SetSubmitting] = useState<boolean>(false);
  const [PageTitle, SetPageTitle] = useState<string>(EditMode ? "" : "Add New Application");
  const [ShowConfirmDeleteModal, SetShowConfirmDeleteModal] = useState(false);
  const [ApplicationForm, SetApplicationForm] = useState<IApplication>({
    status: "Applied",
    position: "",
    company: "",
    applied: new Date(),
    salaries: [],
    employment_forms: [],
    seniority: "Junior",
    locations: [],
    mode: "Office",
    days_in_office: 5,
    link: "",
    skills: [],
    notes: "",
  });

  useEffect(() => {
    if (EditMode) {
      ApiGetApplication(parseInt(id)).then((app) => {
        if (app) {
          SetApplicationForm(app);
          SetPageTitle(`${app.position} at ${app.company} | Application Details`);
        } else {
          console.log("Application not found!");
          navigate("/applications");
        }
      });
    }
  }, [EditMode]);

  function SubmitApplication(e: FormEvent) {
    e.preventDefault();
    SetSubmitting(true);
    const error = ValidateApplication(ApplicationForm);
    if (error) {
      dispatch(ShowNotification({ message: error, notification_type: "error" }));
      SetSubmitting(false);
    } else {
      if (EditMode) {
        ApiUpdateApplication(ApplicationForm as IApiApplication)
          .then(() => {
            SetSubmitting(false);
            navigate("/applications");
            dispatch(ShowNotification({ message: "Application updated!", notification_type: "success" }));
          })
          .catch(() => {
            SetSubmitting(false);
            dispatch(ShowNotification({ message: "Failed to update application. Please try again.", notification_type: "error" }));
          });
      } else {
        ApiAddApplication(ApplicationForm as IApplication)
          .then(() => {
            SetSubmitting(false);
            navigate("/applications");
            dispatch(ShowNotification({ message: "New application added!", notification_type: "success" }));
          })
          .catch(() => {
            SetSubmitting(false);
            dispatch(ShowNotification({ message: "Failed to add new applicaiton. Please try again.", notification_type: "error" }));
          });
      }
    }
  }

  function DeleteApplication() {
    ApiDeleteApplication(parseInt(id!))
      .then(() => {
        navigate("/applications");
        dispatch(ShowNotification({ message: "Application deleted!", notification_type: "success" }));
      })
      .catch(() => {
        dispatch(ShowNotification({ message: "Failed to delete application. Please try again.", notification_type: "error" }));
      });
  }

  return (
    <section id="ApplicationAddEdit">
      <header className="section-header">
        <h1>{PageTitle}</h1>
      </header>

      <article className="content">
        <Link to="/applications">
          <button className="secondary icon">
            <Icon icon="mi-arrow-left" id="icon" />
            Back
          </button>
        </Link>
        <form className="application-form" onSubmit={(e) => SubmitApplication(e)}>
          <div className="form-item">
            <label>Status</label>
            <Select
              options={ApplicationStatuses}
              SelectedOption={ApplicationForm.status}
              SetSelectedOption={(s: IApplicationStatus) => {
                SetApplicationForm({ ...ApplicationForm, status: s });
              }}
              DisplayFun={(val: string) => val}
            />
          </div>
          <div className="form-item">
            <label>Position</label>
            <div className="input-with-icons">
              <input
                type="text"
                placeholder="Software Developer"
                value={ApplicationForm.position}
                onChange={(e) => {
                  SetApplicationForm({ ...ApplicationForm, position: e.target.value });
                }}
              />
              {ApplicationForm.position && (
                <Icon
                  icon="mi-close"
                  id="icon"
                  className="clear-button"
                  onClick={() => {
                    SetApplicationForm({ ...ApplicationForm, position: "" });
                  }}
                />
              )}
            </div>
          </div>
          <div className="form-item">
            <label>Company</label>
            <div className="input-with-icons">
              <input
                type="text"
                placeholder="The Best Company Inc."
                value={ApplicationForm.company}
                onChange={(e) => {
                  SetApplicationForm({ ...ApplicationForm, company: e.target.value });
                }}
              />
              {ApplicationForm.company && (
                <Icon
                  icon="mi-close"
                  id="icon"
                  className="clear-button"
                  onClick={() => {
                    SetApplicationForm({ ...ApplicationForm, company: "" });
                  }}
                />
              )}
            </div>
          </div>
          <div className="form-item">
            <label>Seniority</label>
            <Select
              options={ApplicationSeniorities}
              SelectedOption={ApplicationForm.seniority}
              SetSelectedOption={(s: IApplicationSeniority) => {
                SetApplicationForm({ ...ApplicationForm, seniority: s });
              }}
              DisplayFun={(val: string) => val}
            />
          </div>
          <div className="form-item">
            <label>Applied</label>
            <div className="date-picker">
              <Select
                options={Array.from({ length: 31 }, (_, i) => i + 1)}
                SelectedOption={ApplicationForm.applied.getDate()}
                SetSelectedOption={(s: number) => {
                  SetApplicationForm({ ...ApplicationForm, applied: new Date(ApplicationForm.applied.setDate(s)) });
                }}
                DisplayFun={(val: string) => val}
              />
              <Select
                options={Array.from({ length: 12 }, (_, i) => 0 + i)}
                SelectedOption={ApplicationForm.applied.getMonth()}
                SetSelectedOption={(s: number) => {
                  SetApplicationForm({ ...ApplicationForm, applied: new Date(ApplicationForm.applied.setMonth(s)) });
                }}
                DisplayFun={(val: number) => MONTHS[val]}
              />
              <Select
                options={Array.from({ length: new Date().getFullYear() - 2018 + 6 }, (_, i) => i + 2018)}
                SelectedOption={ApplicationForm.applied.getFullYear()}
                SetSelectedOption={(s: number) => {
                  SetApplicationForm({ ...ApplicationForm, applied: new Date(ApplicationForm.applied.setFullYear(s)) });
                }}
                DisplayFun={(val: string) => val}
              />
            </div>
          </div>

          <div className="form-item">
            <label>Employment Form</label>
            <div className="employment-forms">
              {ApplicationEmploymentForms.map((form) => {
                return (
                  <div
                    className="option"
                    onClick={() => {
                      if (ApplicationForm.employment_forms.includes(form)) {
                        const forms = ApplicationForm.employment_forms.filter((f) => f !== form);
                        const salaries = ApplicationForm.salaries.filter((s) => s.employment_form !== form);
                        SetApplicationForm({ ...ApplicationForm, employment_forms: forms, salaries: salaries });
                      } else {
                        const forms = ApplicationForm.employment_forms;
                        forms.push(form);
                        SetApplicationForm({ ...ApplicationForm, employment_forms: forms });
                      }
                    }}
                  >
                    <Checkbox checked={ApplicationForm.employment_forms.includes(form)} />
                    <p>{form}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-item">
            <div className="label-with-button">
              <label>Salary</label>
              <button
                className="primary icon-button"
                type="button"
                disabled={ApplicationForm.salaries.length >= ApplicationForm.employment_forms.length}
                onClick={() => {
                  const salaries = ApplicationForm.salaries;
                  salaries.push({ min: 0, max: 0, employment_form: ApplicationForm.employment_forms.filter((form) => !ApplicationForm.salaries.map((s) => s.employment_form).includes(form))[0] });
                  SetApplicationForm({ ...ApplicationForm, salaries: salaries });
                }}
              >
                <Icon icon="mi-add" id="icon" />
              </button>
            </div>
            <div className="salaries">
              {ApplicationForm.salaries.length > 0 ? (
                ApplicationForm.salaries.map((s, i) => {
                  return (
                    <div key={i} className="salary-item">
                      <div className="range">
                        <input
                          type="numeric"
                          className="input"
                          placeholder="Min"
                          value={ApplicationForm.salaries[i].min}
                          onChange={(e) => {
                            if (e.target.value.length > 1 && e.target.value[0] === "0") {
                              e.target.value = e.target.value.slice(1);
                            }
                            const salaries = ApplicationForm.salaries;
                            salaries[i].min = e.target.value ? parseInt(e.target.value) : 0;
                            SetApplicationForm({ ...ApplicationForm, salaries: salaries });
                          }}
                        />
                        <span>-</span>
                        <input
                          type="numeric"
                          className="input"
                          placeholder="Max"
                          value={ApplicationForm.salaries[i].max}
                          onChange={(e) => {
                            if (e.target.value.length > 1 && e.target.value[0] === "0") {
                              e.target.value = e.target.value.slice(1);
                            }
                            const salaries = ApplicationForm.salaries;
                            salaries[i].max = e.target.value ? parseInt(e.target.value) : 0;
                            SetApplicationForm({ ...ApplicationForm, salaries: salaries });
                          }}
                        />
                      </div>
                      <Select
                        options={ApplicationForm.employment_forms.filter((form) => !ApplicationForm.salaries.map((s) => s.employment_form).includes(form) || form === s.employment_form)}
                        SelectedOption={s.employment_form}
                        SetSelectedOption={(form: IApplicationEmploymentForm) => {
                          const salaries = ApplicationForm.salaries;
                          salaries[i].employment_form = form;
                          SetApplicationForm({ ...ApplicationForm, salaries: salaries });
                        }}
                        DisplayFun={(val: string) => val}
                      />
                      <button
                        type="button"
                        className="secondary icon-button"
                        onClick={() => {
                          const salaries = ApplicationForm.salaries;
                          salaries.splice(i, 1);
                          SetApplicationForm({ ...ApplicationForm, salaries: salaries });
                        }}
                      >
                        <Icon icon="mi-delete" id="icon" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="no-salaries-label">Use the add button to add the first salary option.</p>
              )}
            </div>
          </div>

          <div className="form-item">
            <label>Location</label>
            <TagInput
              Tags={ApplicationForm.locations}
              SetTags={(tags: string[]) => {
                SetApplicationForm({ ...ApplicationForm, locations: tags });
              }}
              placeholder={ApplicationForm.locations.length === 0 ? "Add a new location by pressing Enter" : "Add another location"}
            />
          </div>

          <div className="mode">
            <div className="form-item">
              <label>Mode</label>
              <Select
                options={["Remote", "Hybrid", "Office"]}
                SelectedOption={ApplicationForm.mode}
                SetSelectedOption={(s: IApplicationMode) => {
                  SetApplicationForm({ ...ApplicationForm, mode: s, days_in_office: s === "Remote" ? 0 : s === "Hybrid" ? 1 : 5 });
                }}
                DisplayFun={(val: string) => val}
              />
            </div>
            {ApplicationForm.mode === "Hybrid" && (
              <div className="form-item">
                <label>Days in the office</label>
                <Select
                  options={[1, 2, 3, 4]}
                  SelectedOption={ApplicationForm.days_in_office}
                  SetSelectedOption={(s: number) => {
                    SetApplicationForm({ ...ApplicationForm, days_in_office: s });
                  }}
                  DisplayFun={(val: string) => val}
                />
              </div>
            )}
          </div>

          <div className="form-item">
            <label>Skills</label>
            <TagInput
              Tags={ApplicationForm.skills}
              SetTags={(tags: string[]) => {
                SetApplicationForm({ ...ApplicationForm, skills: tags });
              }}
              placeholder={ApplicationForm.skills.length === 0 ? "Add a new skill by pressing Enter" : "Add another skill"}
            />
          </div>

          <div className="form-item">
            <label>Link</label>
            <div className="input-with-icons">
              <input
                type="text"
                placeholder="https://www.linkedin.com/your-dream-job-posting"
                value={ApplicationForm.link}
                onChange={(e) => {
                  SetApplicationForm({ ...ApplicationForm, link: e.target.value });
                }}
              />
              {ApplicationForm.link && (
                <Icon
                  icon="mi-close"
                  id="icon"
                  className="clear-button"
                  onClick={() => {
                    SetApplicationForm({ ...ApplicationForm, link: "" });
                  }}
                />
              )}
            </div>
          </div>

          <div className="form-item">
            <label>Additional Notes</label>
            <textarea
              className="input"
              value={ApplicationForm.notes}
              placeholder="They offer some great benefits, including a gym membership and a free lunch every day."
              rows={4}
              onChange={(e) => {
                SetApplicationForm({ ...ApplicationForm, notes: e.target.value });
              }}
            ></textarea>
          </div>

          {!EditMode ? (
            <div className="actions">
              <button type="submit" className="primary submit" disabled={Submitting}>
                Create Application
              </button>
            </div>
          ) : (
            <div className="actions">
              <button type="button" className="secondary delete" disabled={Submitting} onClick={() => SetShowConfirmDeleteModal(true)}>
                Delete Application
              </button>
              <button type="submit" className="primary submit" disabled={Submitting}>
                Update Application
              </button>
            </div>
          )}

          {ShowConfirmDeleteModal && (
            <ConfirmModal
              title="Delete application?"
              message={`Are you sure you want to delete '${ApplicationForm.position} at ${ApplicationForm.company}'? This cannot be undone!`}
              onConfirm={DeleteApplication}
              onCancel={() => SetShowConfirmDeleteModal(false)}
            />
          )}

          {/* placeholder */}
          <p>{JSON.stringify(ApplicationForm)}</p>
        </form>
      </article>
    </section>
  );
}
