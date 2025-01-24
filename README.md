# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Step 0: On-Premise

In this exercise we will familiarise ourselves with the Codespaces environment and 
the demo application - a web based discussion forum called ok-forum.  

To do this, we will install and start both the [React](https://react.dev) based frontend of our demo application 
and the [Spring Boot](https://spring.io/projects/spring-boot) based backend.

**Note:**
> Make sure you are on branch `0_on_premises`.

### Frontend installation and start up

To bring our frontend up and running we have to install some react modules via npm package manager 
(see packages.json for details) and start the react app in development mode afterward. To do so, just 
perform the following steps: 

1. Go to the Codespaces browser window and open a new terminal.
2. Switch to the 'frontend' folder and install referenced react modules: 

    ```
    $ cd frontend
    $ npm install
    ```

3. Start the frontend via
   
    ```
    $ npm run dev
    ```

    After having started the frontend a message should pop up which tells how to reach the frontend. 
The output should look like ... 

    ```
    VITE v4.3.9  ready in 312 ms
    
    ➜  Local:   http://localhost:5173/
    ➜  Network: http://10.0.12.245:5173/
    ➜  press h to show help
    ```

4. Test the frontend installation 
   - switch to the 'port' tab
   - click browser symbol next to 'redirected url'

**Note:**
You only need to start the frontend once and leave it running for the duration of the workshop. 

### Backend installation, start and test

After having installed and started our frontend let's take care of the backend: 

1. Go to the Codespaces browser window and open a new terminal.
2. Switch to the 'app' folder and packsage and start the backend using [maven](https://maven.apache.org):

    ```
    $ mvn spring-boot:run
    ```
   
    This command will first package our Java backend and start it afterward as a self-contained application 
using the Spring Boot mechanism. At the end of the log output you will find the port under which the backend can 
be reached. 

3. Make the backend 'public' available: 
   - goto tab 'ports'
   - switch visibility of backend port 8080 to public (via right click menu) 
4. Test backend using your browser, postman, ...  

    ```
    https:[ASIGNED_CODESPACE_URI]/users
    ```
    You have to confirm that 'you are about to access a development port served by someone's codespace'

### Connecting frontend and backend

_DRAFT VERSION - CHANGES MY OCCUR DUE TO CODESPACES TLS ISSUE_

Last but not least we have to connect our backend with our frontend. To do so we will have to reference  
the URL of or backend inside the frontend showcases configuration typescript file: 

1. To look up and copy the backend URL open the VSCode ports tab in your Codespace and 
copy the URL that is referenced for port 8080. Make sure that the visibility is set to public!

2. Go to the typescript file showcases.ts that can be found in ./frontend/src of your frontend 
project. Replace the fake URL `baseUrl: http://todo.invalid` of the entry "0 – On-Premises" with 
the valid URL of the backend. The result should look like.   

    ```
    export const SHOWCASES: ShowcaseConfig = {
        "0 – On-Premises": {
            baseUrl: "http:[ASSIGNED_CODESPACE_URI]",
        },
    ```
3. Open the ok-forum app in a browser of your choice (URL see above) and select the showcase "0 – On-Premises" 
in the dropdown. 

4. Check if the ok-forum app works properly by clicking through the forums categories, topics and 
discussions. 

**Note**: Don't forget to stop the backend by pressing Ctrl+C in the backend terminal.

### Congratulations ...  

You have finished your first hands-on exercise using GitHub Codespaces.

Now let's GO TO THE CLOUD ...
