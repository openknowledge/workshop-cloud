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

### Backend installation and set up of the frontend

After having installed and started our frontend let's take care of the backend: 

1. Go to the Codespaces browser window and open a new terminal.
2. Switch to the 'app' folder and packsage and start the backend using [maven](https://maven.apache.org):

    ```
    $ mvn spring-boot:run
    ```
   
    This command will first package our Java backend and start it afterwards as a self contained application 
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


Congratulations! You have finished your first hands-on exercise using GitHub Codespaces. 

Now let's GO TO THE CLOUD ...


**TBD - will not work so far!** 

5. Connect the frontend to the backend
   - Adjust the showcase "0 – On-Premises" in `frontend/src/showcases.ts`
     - Set the base URL to the URL of the backend
         - Reminders:
             - You will find the URLs in the VSCode Codespaces ports tab
             - The Backend Service runs on Port 8080
             - The Backend Port Visibility must be set to public
     - Open the App in the Browser and select the showcase "0 – On-Premises" in the dropdown
     - Check if the app works properly

6. Stop the backend by pressing Ctrl+C in the backend terminal

