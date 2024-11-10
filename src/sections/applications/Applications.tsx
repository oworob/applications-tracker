import { useState, useEffect } from "react";
import "./Applications.scss";
import { Icon } from "@iconify/react";
import NullHandler from "helpers/NullHandler";
import { IApiApplication, IApplication } from "models/application";
import ExportCSV from "helpers/ExportApplicationsToCSV";
import Capitalize from "helpers/Capitalize";
import { Link, useNavigate } from "react-router-dom";
import ShortURL from "helpers/ShortURL";
import { ApiGetApplications } from "services/ApplicationsService";
import { FormatDate } from "helpers/FormatDate";
import LoadingIcon from "components/loading/LoadingIcon";
import Checkbox from "components/checkbox/Checkbox";
import { MONTHS } from "models/constants";

const columns = ["status", "position", "company", "seniority", "applied", "salary", "location", "mode", "skills", "link"];

const rows_per_page = 5;

export default function Applications() {
  const navigate = useNavigate();
  const [Loading, SetLoading] = useState(true);
  const [SortKey, SetSortKey] = useState("applied");
  const [SortOrder, SetSortOrder] = useState(-1);
  const [Applications, SetApplications] = useState<IApiApplication[]>([]);
  const [FilteredData, SetFilteredData] = useState(Applications);
  const [SearchPhrase, SetSearchPhrase] = useState("");
  const [VisibleColumns, SetVisibleColumns] = useState(columns);
  const [ShowColumnsSelect, SetShowColumnsSelect] = useState(false);
  const [Page, SetPage] = useState(1);

  useEffect(() => {
    FilterAndSortData();
  }, [SortKey, SortOrder, SearchPhrase, Applications]);

  useEffect(() => {
    ApiGetApplications().then((applications) => {
      SetApplications(applications);
      SetLoading(false);
    });
  }, []);

  function FilterAndSortData() {
    let filtered_data: IApiApplication[] = [...Applications];

    if (SearchPhrase) {
      filtered_data = Applications.filter((application) => {
        const applied_month = MONTHS[application.applied.getMonth()];
        const salaries = application.salaries.map((s) => [s.min, s.max]).flat();
        return (
          Object.values(application).some((value) => value.toString().toLowerCase().includes(SearchPhrase.toLowerCase())) ||
          applied_month.toLowerCase().includes(SearchPhrase.toLowerCase()) ||
          salaries.some((s) => s.toString().includes(SearchPhrase))
        );
      });
    }

    filtered_data.sort((a: IApplication, b: IApplication) => {
      if (SortKey === "salary") {
        if (a.salaries.length === 0) {
          return -1 * SortOrder;
        } else if (b.salaries.length === 0) {
          return 1 * SortOrder;
        }
        const max_a = a.salaries.sort((a, b) => b.max - a.max)[0].max;
        const max_b = b.salaries.sort((a, b) => b.max - a.max)[0].max;
        if (max_a < max_b) {
          return -1 * SortOrder;
        } else if (max_a > max_b) {
          return 1 * SortOrder;
        } else {
          return 0;
        }
      } else if (SortKey === "location") {
        if (a.locations.length < b.locations.length) {
          return -1 * SortOrder;
        } else if (a.locations.length > b.locations.length) {
          return 1 * SortOrder;
        } else {
          return 0;
        }
      } else if (SortKey === "skills") {
        if (a.skills.length < b.skills.length) {
          return -1 * SortOrder;
        } else if (a.skills.length > b.skills.length) {
          return 1 * SortOrder;
        } else {
          return 0;
        }
      } else if (SortKey === "mode") {
        if (a.mode < b.mode) {
          return -1 * SortOrder;
        } else if (a.mode > b.mode) {
          return 1 * SortOrder;
        } else if (a.mode !== "Hybrid" && b.mode !== "Hybrid") {
          return 0;
        } else {
          if (a.days_in_office < b.days_in_office) {
            return -1 * SortOrder;
          } else if (a.days_in_office > b.days_in_office) {
            return 1 * SortOrder;
          } else {
            return 0;
          }
        }
      } else {
        if (a[SortKey as keyof IApplication] < b[SortKey as keyof IApplication]) {
          return -1 * SortOrder;
        } else if (a[SortKey as keyof IApplication] > b[SortKey as keyof IApplication]) {
          return 1 * SortOrder;
        } else {
          return 0;
        }
      }
    });

    console.log("filtered!");
    SetFilteredData(filtered_data);
  }

  return (
    <section id="Applications">
      <header className="section-header">
        <h1>Applications</h1>
        <p>Manage your current and past applications.</p>
      </header>

      {Applications.length > 0 && (
        <article className="content">
          <div className="actions">
            <div className="left">
              <Link to="/applications/add">
                <button className="primary icon add-button">
                  <Icon icon="mi-document-add" id="icon" />
                  Add
                </button>
              </Link>

              <button className="secondary icon" onClick={() => ExportCSV(FilteredData, "applications")}>
                <Icon icon="mi-export" id="icon" />
                Export
              </button>
            </div>

            <div className="filters">
              <div className="input-with-icons search">
                <Icon icon="mi-search" id="icon" />
                <input type="text" placeholder="Search" value={SearchPhrase} onChange={(e) => SetSearchPhrase(e.target.value)} />
                {SearchPhrase && (
                  <Icon
                    icon="mi-close"
                    id="icon"
                    className="clear-button"
                    onClick={() => {
                      SetSearchPhrase("");
                    }}
                  />
                )}
              </div>

              <div
                className={`columns-select-wrapper  ${ShowColumnsSelect ? "open" : ""}`}
                onMouseLeave={() => {
                  SetShowColumnsSelect(false);
                }}
              >
                <button
                  className="secondary icon columns-select-header"
                  onClick={() => {
                    SetShowColumnsSelect(!ShowColumnsSelect);
                  }}
                >
                  <Icon icon="mi-table" id="icon" />
                  Columns
                </button>
                <div className="columns-select-options">
                  <div
                    className="option"
                    onClick={() => {
                      SetVisibleColumns(columns);
                    }}
                  >
                    <p>Show All</p>
                  </div>
                  {columns.map((column) => (
                    <div
                      className="option"
                      key={column}
                      onClick={() => {
                        if (VisibleColumns.length > 1 && VisibleColumns.includes(column)) {
                          SetVisibleColumns(VisibleColumns.filter((c) => c !== column));
                        } else if (!VisibleColumns.includes(column)) {
                          SetVisibleColumns([...VisibleColumns, column]);
                        }
                      }}
                    >
                      <Checkbox checked={VisibleColumns.includes(column)} />
                      <p>{Capitalize(column)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  {columns
                    .filter((c) => VisibleColumns.includes(c))
                    .map((column, index) => (
                      <th
                        key={index}
                        onClick={() => {
                          if (SortKey === column) {
                            SetSortOrder(-SortOrder);
                          } else {
                            SetSortKey(column);
                            SetSortOrder(1);
                          }
                        }}
                        className={SortKey === column ? "active" : ""}
                      >
                        <span className="flex">
                          {Capitalize(column)}
                          <Icon icon="mi-chevron-up" id="icon" className={SortKey === column && SortOrder === -1 ? "desc" : ""} />
                        </span>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {FilteredData.slice((Page - 1) * rows_per_page, (Page - 1) * rows_per_page + rows_per_page).map((application, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      navigate(`/applications/${application.id}`);
                    }}
                  >
                    {VisibleColumns.includes("status") && (
                      <td>
                        <div className="status">
                          {application.status === "Applied" && <Icon icon="mi-email" />}
                          {application.status === "Interview Scheduled" && <Icon icon="mi-calendar" />}
                          {application.status === "Post Interview" && <Icon icon="mi-users" />}
                          {application.status === "Rejected" && <Icon icon="mi-circle-error" />}
                          {application.status}
                        </div>
                      </td>
                    )}
                    {VisibleColumns.includes("position") && <td>{application.position}</td>}
                    {VisibleColumns.includes("company") && <td>{application.company}</td>}
                    {VisibleColumns.includes("seniority") && <td>{application.seniority}</td>}
                    {VisibleColumns.includes("applied") && <td>{FormatDate(application.applied, true)}</td>}
                    {VisibleColumns.includes("salary") && (
                      <td>
                        {application.salaries.length > 0
                          ? application.salaries.map((s, i) => {
                              return (
                                <p key={i}>
                                  {s.min} - {s.max} ({s.employment_form})
                                </p>
                              );
                            })
                          : NullHandler()}
                      </td>
                    )}
                    {VisibleColumns.includes("location") && <td>{NullHandler(application.locations.join(", "))}</td>}
                    {VisibleColumns.includes("mode") && <td>{application.mode === "Hybrid" ? `${application.mode} (${application.days_in_office})` : application.mode}</td>}
                    {VisibleColumns.includes("skills") && <td>{NullHandler(application.skills.join(", "))}</td>}
                    {VisibleColumns.includes("link") && (
                      <td>
                        {application.link ? (
                          <a href={application.link} target="_blank" rel="noopener noreferrer" className="link">
                            {ShortURL(application.link)}
                          </a>
                        ) : (
                          NullHandler()
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {FilteredData.length > rows_per_page && (
            <div className="paginator">
              {Array.from({ length: Math.ceil(FilteredData.length / rows_per_page) }, (_, i) => (
                <button key={i + 1} className={`button ${Page === i + 1 ? "primary" : "secondary"}`} onClick={() => SetPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </article>
      )}

      {Applications.length === 0 && !Loading && (
        <article className="content empty">
          <p>Looks like you haven't added any applications yet.</p>
          <Link to="/applications/add">
            <button className="primary icon add-button">
              <Icon icon="mi-document-add" id="icon" />
              Add Your First Application
            </button>
          </Link>
        </article>
      )}

      {Loading && (
        <article className="content loading-panel">
          <LoadingIcon />
        </article>
      )}

      <header className="section-header">
        <h1>Upcoming Interviews</h1>
        <p>Make sure not to miss any date.</p>
      </header>

      <article className="content">
        <div className="actions">
          <Link to="/applications/add">
            <button className="primary icon add-button">
              <Icon icon="mi-document-add" id="icon" />
              Schedule
            </button>
          </Link>
        </div>
      </article>
    </section>
  );
}
