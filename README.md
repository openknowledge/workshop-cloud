# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Step 2: Managed Services (simple version)

During the last exercise we learned how to set up, build and start a scalable backend service making use of 
several AWS components, in particular
- Application Load Balancer
- Target Group
- Auto Scaling Group
- Launch Template
- EC2 Instance 

As we also learned there is still a lot of "manual" work to do to realise such a scenario, even if 
using launch templates and auto-scaling.   

In this exercise, we will take our so far solution to the next level and make use of a cloud managed
service called [AppRunner](https://aws.amazon.com/de/apprunner/). AWS AppRunner is an application and / 
or (backend / frontend) hosting and delivering provider and therefore will take care of most of the 
manual steps from our previous example.

To make use of the benefits of AppRunner we have to build a docker image containing our backend service  
and push this image to the fully managed [Elastic Container Registry (ECR)](https://aws.amazon.com/de/ecr/) 
of AWS first.     

During this exercise you will:
- Log into the AWS Cloud via command line interface (AWS CLI)
- Make use of the cloud container registry
- Build a docker image containing our backend service and push it to ECR 
- Use AppRunner to provide applications and services 
- Connect the frontend with the backend

**Note:**
> Make sure you are on branch `2_managed_services`.

### Using AWS CLI to connect to the cloud  

First of all we want to connect to AWS via AWS CLI. This is necessary to be able to 
push the docker image with our backend service to the Elastic Container Registry later on. 

1. open a new terminal in Codespaces using the terminal tab
2. Configure your AWS connection using the `aws configure` command that will
ask you step by step for all relevant information to sign in to AWS via cli:    
    ```
    $ aws configure
       
    AWS Access Key ID [None]: [YOUR AWS ACCESS KEY]
    AWS Secret Access Key [None]: [YOUR SECRET ACCESS KEY]
    Default region name [None]: eu-central-1 
    Default output format [None]: json
    ```
3. Make an AWS CLI call to test connection, e.g. asking for the caller identity (aka YOU):  
    ```
    $ aws sts get-caller-identity
   
   
    OUTPUT SHOULD LOOK LIKE:  
    {
       "UserId": "AIDASVQKHPCR2LKF6UHNT",
       "Account": "183631313059",
       "Arn": "arn:aws:iam::183631313059:user/dog"
    }
    ```

### Make use of the cloud container registry (ECR)

During this step we will create an elastic container registry for our account and 
build and push a docker image containing our backend service to it afterward using 
the above established connection and the AWS CLI. 

Let's start with creating the ECR for our/your account: 

1. Go to https://console.aws.amazon.com/console/home
2. Log into your AWS account via web console using your credentials.
3. Choose AWS ECR service via global search or service overview (Container). 
4. Click "Create repository". This will lead you to the "Create a private repository" page.
5. Fill in the following values: 
   - repository name: name your ECR with the prefix of your animal, e.g. dog-container-repository.
   - leave everything else as is but feel free to take a look at the different configuration options
6. Click "Create" to initialize and create an empty container repository. 

Next we want to build a docker image containing our backend service and push it to the registry: 

1. Open a new terminal in Codespaces using the terminal tap. 
2. Make sure you're in the app folder using the `pwd` command. 
3. Use maven to build the backend service  
    ```
    $ mvn clean package
    ```
4. Build and push the docker image to the elastic container registry. Feel free to 
use a different repository / image name if you are familiar with docker: 
   - Goto the AWS web console 
   - Choose ECR service and select your ECR
   - Click "View push commands"
   - Follow the instructions using the Codespace terminal to 
     - authenticate your Docker client to your registry
     - build docker image 
     - tag your docker image to be able to push it to the repository 
     - push docker image to ECR 
5. Check the ECR for the image with tag "latest"
   - Goto the AWS web console
   - Choose ECR service and select your ECR

### Create an AppRunner service

Up to this point we have prepared everything we need to create and configure an 
AppRunner service providing our backend service in a scalable manner: 

1. Go to https://console.aws.amazon.com/console/home
2. Log into your AWS account via web console using your credentials.
3. Choose AppRunner service via global search or service overview (Compute).
4. Click "Create service". This will lead you to AppRunner create service wizard (step 1 of 3)
5. AppRunner wizard step 1 of 3: 
   - Select "Container registry" (should be pre-selected)
   - Select "Amazon ECR" (should be pre-selected)
   - Browse to find your image repository and image tag
   - Select "Automatic" deployment trigger (for latter use)
   - Choose existing service rule "AppRunnerECRAccessRule"
   - Click "next" to get to step 2 of the wizard
6. AppRunner wizard Step 2 of 3:
   - Service name: use your animal name to prefix the service name, e.g. dog-app-runner-service.
   - Security instance role: use the existing "AppRunner" role
   - Click "next" button 
7. AppRunner wizard Step 3 of 3:
   - Review your settings 
   - Click "Create & Deploy" 

**Note**: The creation and deployment of the AppRunner service may take several minutes.
Think of all the magic that goes on behind the scenes. So it is only fair to be willing to wait 
some minutes.  

### Connect our frontend to the AppRunner service

After successfully being deployed it is time to connect our frontend to the AppRunner service.

1. Goto AppRunner service page and select your AppRunner instance
2. Copy the AppRunner service default domain 
3. Go to the typescript file showcases.ts that can be found in ./frontend/src of your frontend project. 
4. Replace the fake URL baseUrl: http://todo.invalid of the entry "2 - Managed Services" with the valid URL of the backend. 
The result should look like.
    ```
    export const SHOWCASES: ShowcaseConfig = {
    "2 – Managed Services": {
        baseUrl: "http:[APP_RUNNER_SERVICE_ADDRESS]",
    },
    ```

To test the AppRunner service and the connection from our frontend to it open the ok-forum 
app in a browser of your choice (URL see above) and select the showcase "2 – Managed Services" 
in the dropdown.  Check if the ok-forum app works properly by clicking through the forums 
categories, topics and discussions.

### Congratulation

Making use of the AppRunner service we have benefit from one of the advanced managed services of AWS.
Next we will get to know some platform services (aka PaaS) in general and connect our backend to 
a noSQL service for date and information storage and retrieval called DynamoDB. 

Fasten your seatbelts PaaS service! HERE WE COME ... 

