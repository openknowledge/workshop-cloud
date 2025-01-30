# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Step 0: On-Premise

In this exercise we will familiarise ourselves with the [GitHub Codespaces](https://github.com/features/codespaces) 
environment and the demo application - a web based discussion forum called ok-forum.  

To do this, we will install and start both the [React](https://react.dev) based frontend of our demo application 
and the [Spring Boot](https://spring.io/projects/spring-boot) based backend.

The following instructions assume that you already have created a Codespace from within 
the [open knowledge Cloud Workshop](https://github.com/openknowledge/workshop-cloud) repository. 

**Note:**
> Make sure you are on branch `0_on_premises`.

### Frontend installation and start up

To bring the frontend up and running we have to install some react modules via `npm` package manager 
and start the react-based frontend in development mode afterward. 

**Note**: See `packages.json` in `frontend` folder for installation details.

To do so, just perform the following steps:

1. Go to the GitHub Codespaces browser window and open a new terminal via terminal tab.
2. Switch to the 'frontend' folder and install all necessary react modules: 

    ```
    $ cd frontend
    $ npm install
    ```

3. Start the frontend in development mode: 
   
    ```
    $ npm run dev
    ```

    After having started the frontend a message will pop up telling you how to reach the frontend. 
The output will look like ... 

    ```
    VITE v4.3.9  ready in 312 ms
    
    ➜  Local:   http://localhost:5173/
    ➜  Network: http://10.0.12.245:5173/
    ➜  press h to show help
    ```

4. Test the frontend installation 
   - switch to the 'port' tab of Codespace 
   - click browser symbol next to 'redirected url'

**Note:**
You only need to start the frontend once and leave it running for the duration of the workshop. 

### Backend installation, start and test

After having installed and started our frontend let's take care of the backend: 

1. Go to the Codespaces browser window and open a new terminal.
2. Switch to the 'app' folder via `cd app`
3. Packsage and start the backend using [maven](https://maven.apache.org):
    ```
    $ mvn spring-boot:run
    ```
   
    This command will first package our Java backend and start it afterward as a self-contained service 
using the Spring Boot mechanism. Take a look at the end of the log output where you will find the port 
under which the backend can be reached (should be 8080). 

4. Make the backend 'public' available: 
   - goto tab 'ports' in Codespace 
   - switch visibility of backend port 8080 to public (via right click menu)
5. Copy assigned Codespace URL aka "Forwarded Address" for port 8080. 
5. Test the backend using your browser, postman, ...  

    ```
    [ASIGNED_CODESPACE_URI]/users
    ```
    You have to confirm that 'you are about to access a development port served by someone's codespace'

### Connecting frontend and backend

_DRAFT VERSION - CHANGES MY OCCUR DUE TO CODESPACES TLS ISSUE_

Last but not least we want to connect our backend to our frontend. To do so we have to reference  
the URL of or backend service inside the frontend showcases configuration typescript file: 

1. To look up and copy the backend URL open the VSCode ports tab in your Codespace and 
copy the URL (aka "Forwarded Address") that is referenced for port 8080. Make sure that 
the visibility is set to public!

2. Go to the typescript file `showcases.ts` that can be found in `./frontend/src` of your frontend 
project. Replace the fake URL `baseUrl: http://todo.invalid` of the entry "0 – On-Premises" with 
the valid URL of the backend. The result should look like. 

    ```typescript
    export const SHOWCASES: ShowcaseConfig = {
        ...
        "0 – On-Premises": {
            baseUrl: "[ASSIGNED_CODESPACE_URI]",
        },
        ...
    }
    ```

3. Open the ok-forum app in a browser of your choice (URL see above) and select the 
showcase "0 – On-Premises" in the dropdown. 

4. Check if the ok-forum app works properly by clicking through the forums categories, 
topics and discussions. 

**Note**: Don't forget to stop the backend by pressing Ctrl+C in the backend terminal.

### Congratulations ...  

You have finished your first hands-on exercise using GitHub Codespaces.

Now let's GO TO THE CLOUD ...
