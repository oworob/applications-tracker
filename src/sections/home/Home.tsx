import "./Home.scss";

export default function Home() {
  return (
    <section id="Home">
      <header className="section-header">
        <h1>Welcome!</h1>
        <p>Are you burnt out and exhausted by having to keep track of all your job applications, too?</p>
      </header>
      <article className="content">
        <div className="questions">
          <div className="question">
            <h3>What is this? Where am I?</h3>
            <p>Fear not! This is just a simple application to help you stay organized while you search for your dream job.</p>
          </div>
          <div className="question">
            <h3>Why make this?</h3>
            <p>
              I was tired of having to keep track of all my job applications in a spreadsheet and wanted to make something that would help me keep track of everything in one place. Also, another
              project in the portfolio that no one is going to see!
            </p>
          </div>
          <div className="question">
            <h3>Where is my data stored?</h3>
            <p>
              Your data is safely stored within your browser, on your local computer. If you ever want to clear your data, you can do so by clearing your browser's cache. There's also an option to
              export it to a CSV file if you want to save it somewhere else (or if you just really, really like spreadsheets).
            </p>
          </div>
          <div className="question">
            <h3>Is this free?</h3>
            <p>Yes! This is a free, open-source project. You can find the source code on GitHub. From one unemployed programmer to another, I hope you find it useful.</p>
          </div>
          <div className="question">
            <h3>What is the Questions tab about?</h3>
            <p>
              The Questions tab is your own little database of potential interview questions. You can add, edit, and delete questions as you see fit. It can help you prepare for your interviews and is
              a much better way to keep track of your questions than a DOCX file - trust me, been there, done that.
            </p>
          </div>
          <div className="question">
            <h3>How did you make this?</h3>
            <p>
              This project was made using React, TypeScript, and SCSS. No fancy component libraries or Tailwind. There is no server or database - everything is stored in your browser using IndexedDB.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
