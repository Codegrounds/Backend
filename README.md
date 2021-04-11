## Inspiration
This time around, we wanted to focus on the social impact of our product and we thought about how great it would be to make a website that teaches you how to code. We pulled inspiration from sites like CodeHS and are making plans to expand on that.

## What it does
Codegrounds allows someone to learn langauges (in this case we only implemented basic JavaScript for now) through interactive lessons and tutorials. Users will have access to a code editor within the browser as well, allowing them to write code and try it out. Additionally, it keeps track of the user's progress and the code that they write.

## How we built it
We split the entire project into two things, a backend and frontend. The backend is written in TypeScript and uses Koa and PostgreSQL (TypeORM) to store users, run code, and serve as a RESTful API that could be consumed by the client. It runs on Docker containers in a cluster swarm hosted on a VPS. It's then hosted on a domain via Nginx and Cloudflare.

The frontend is written using JavaScript and TypeScript and it is a React application. It handles most of the UI and makes API calls where necessary. Additionally, we implemented the monaco-editor which is the code editor used within Visual Studio Code, since it has support for the browser.

## Challenges we ran into
One of the biggest challenges for the backend and frontend were authentication. Using Koa Session, the backend was supposed to set a session cookie, however React has strict rules on what cookies it will accept so it took hours to try and get it working.

Another challenge we faced was getting the actual text editor and the code runner working. The code has to be sanitized and updated before it can be run since it has tests that it has to pass to be considered valid. Additionally, we also had to prevent bad code from being run (such as an infinite while loop) that could potentially break the server.

## Accomplishments that we're proud of
We are proud of the pace that we managed to work with for this project. Towards the end of Saturday, we hadn't made much progress however today we were able to get many of the challenging things like code saving and validation done. We are also proud of the fact that we managed to get the authentication and code runners working, because they were a really big challenge. Additionally, we were at somewhat of a disadvantage because we had 3 members on our team instead of 4.

## What we learned
We learned a lot about the React APIs especially stuff like state, mounting, and dependencies. We also learned that functional programming is not a good idea for React because it makes stuff harder.

## What's next for Codegrounds
We have plans to expand it and probably rewrite it because it's built on code written mostly between 1 and 6 AM. Multiple choice questions were somewhat implemented so we want to build off of that and also introduce other types of lessons and content such as videos, images, and interactive code sessions. Additionally we had some plans for potential live collaboration, we aren't too sure about that yet. We want to support many langauges and probably focus on marketing for this product as we believe it has a place.
