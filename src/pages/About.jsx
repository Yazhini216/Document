import React from 'react';
import "./About.css"

const About = () => {
    return (
        <div>
          
            <div className='suba'>
      {/* Header Section */}
      <section className="head">
        <div className="head">
         <h1>Create, Collaborate and Conquer with Brigades
        </h1>
        </div>
      </section>

      {/* Card Section */}
      <section className="card-container">
        <div className="card carda">
          <div className="mul">
            <img className='sub1'
              src="https://media.istockphoto.com/id/1342422313/vector/task-distribution-and-work-management-sharing-data-and-file-folder-online-concept.jpg?s=612x612&w=0&k=20&c=nmgfjcP-mZUz9zzwn7NKGd476kJFKZfp6-RpjufQWTM="
              alt="Multiple Sharing Options"
            />
          </div>
          <h2 className='z1' >Multiple Share</h2>
          <p>Share work intelligently via shareable links, trackable links & website embeds.</p>
        </div>

        <div className="card cardb">
          <div className="mul">
            <img className='sub1'
              src="https://img.freepik.com/premium-vector/artificial-intelligence-against-hacker-background-masked-chatbot_654163-339.jpg?w=900"
              alt="AI Genius Assistant Writer"
            />
          </div>
          <h2 className='z1'>AI Assistant Writer</h2>
          <p>Maximize your productivity and writing skills in seconds using AI Genius.</p>
        </div>

        <div className="card cardc">
          <div className="mul">
            <img className='sub1'
              src="https://magenta-tildi-4.tiiny.site/WhatsApp-Image-2025-02-23-at-6-58-59-PM.jpeg"
              alt="Collaboration"
            />
          </div>
          <h2 className='z1'>Collaboration</h2>
          <p>Collaborate effortlessly with team members and guests in real-time, no matter where they are.</p>
        </div>

        <div className="card cardd">
          <div className="mul">
            <img className='sub1'
              src="https://media.istockphoto.com/id/1260329688/vector/tiny-characters-with-magnifying-glass-and-red-pencil-editing-mistakes-in-paper-test-teacher.jpg?s=612x612&w=0&k=20&c=hD627fBQS69q7boTDDA7mivHitizPUZhhZFxUUuJhiA="
              alt="Real-Time Editing"
            />
          </div>
          <h2 className='z1'>Real-Time Editing</h2>
          <p>Edit and update content instantly with seamless collaboration, ensuring everyone stays on the same page.</p>
        </div>

        <div className="card carde">
          <div className="mul">
            <img className='sub1'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR4HtQ4yC8X8orcODL5NXSbYLbA59cboO68A&s"
              alt="Seamless Communication"
            />
          </div>
          <h2 className='z1'>Seamless Communication</h2>
          <p>
            Built-in chat, comments, and mentions (@tagging). Audio and video calls for better collaboration.
          </p>
        </div>

        <div className="card cardf">
          <div className="mul">
            <img className='sub1'
              src="https://acropolium.com/img/articles/logistics-and-shipping-apis/img06.jpg"
              alt="Customization & API Access"
            />
          </div>
          <h2 >Customization & API Access</h2>
          <p>Custom themes, branding, and UI adjustments. API access for integrating with other tools.</p>
        </div>
      </section>

      {/* Why Brigades Section */}
      <section className="y">
        <h1>Why Brigades??</h1>
        <div className="con">
          <div className="feature">
            <h3>⚡ Offline Editing</h3>
            <p>Work on documents without an internet connection. Auto-sync changes when reconnected.</p>
          </div>
          <div className="feature">
            <h3>🛠 Customizable Workspaces</h3>
            <p>Create teams, folders, and structured workflows. Personalized dashboard for easy document management.</p>
          </div>
          <div className="feature">
            <h3>⏳ Task & Workflow Management</h3>
            <p>Assign tasks and set deadlines within documents. Track progress and receive notifications.</p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section>
        <div className="cards">
          <div className="us">
            <div className="jo">
              <h1>Join Us!!</h1>
            </div>
            <div className="join">     
              <p>
                We are committed to building a future where collaboration is effortless and effective. Whether you're an individual, a small team, or a large enterprise, Brigades is here to enhance your productivity and streamline your document management.
              </p>
              <p>Start collaborating today!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    );
};

export default About;