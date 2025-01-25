# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Step 3: Platform as a Service (PaaS)

In the last exercise, we used a managed service called AppRunner to easily deploy our 
backend service and make it scalable. The AppRunner service has relieved us of the task of setting up and connecting 
a number of internal AWS components, saving us a lot of time and effort.

In this exercise, we will also use the feature that the AppRunner service automatically recognises changes to the 
deployed backend service and triggers a redeployment. We are expanding our backend service with a permanent NoSQL 
data storage ([DynamoDB](https://aws.amazon.com/de/dynamodb/)) and are converting the Spring-Boot application so 
that the data of the ok-Forum service is persisted there.

During this exercise you will:
- Log into the AWS Cloud via AWS management console
- Create a dynamoDB table 
- Update backend service and related docker image 
- Update docker image in ECR
- Change configuration of AppRunner

### Log into the AWS Cloud

First of all we have to connect to the AWS Cloud:

1. Go to https://console.aws.amazon.com/console/home
2. Select "IAM user sign in" if not already preselected
3. Use the user information provided to you to sign in
    - Account ID: [WORKSHOP ACCOUNT ID]
    - IAM username: [YOUR ANIMAL]
    - Password: [YOUR ANIMAL PWD]

After successfully logged in You should see the AWS CLoud main dashboard.

**Note**: Make sure the region in the upper right corner of the browser window
is set to "Europe (Frankfurt)" aka eu-central-1.

### Create a dynamoDB table

To create a dynamoDB table we have to call the DynamoDB dashboard first. There are
several ways to do so: 

- use global quick search and lookup for "DynamoDB"
- select DynamoDB service from service overview via "Database"
- select DynamoDB service from "recently visited" (if available)

Use the DynamoDB dashboard to create and configure a new dynamoDB table: 

1. Click "Create table" (left border of the dashboard). This will lead 
you to the "Creat table" page of DynamoDB.
2. Fill in the following values (and leave everything as is): 
   - Table name: name your table with the prefix of your animal, e.g. dog-dynamo-table.
   - Partition key: Use a partition key called "pk" with type string
   - Sort key: Use a sort key called "sk" with type string
   - Click "Create table" button

Finally, click "Create table" button. You will see the DynamoDB dashboard tables overview 
when everything done right.

### Create new version of the backend service

Next we have to update our backend service to be able to access the dynamoDB table we 
have just created: 

1. Open a new terminal in Codespaces using the terminal tab. 
2. Make sure you are in the `app` folder using the `pwd` command.
3. Build a new version of the backend service using maven:
   
   ```
   mvn clean package
   ```

### Update docker image in ECR

As you may remember from the last exercise, we first have to connect to AWS via AWS cli 
to be able to push the docker image with our backend service to the Elastic Container 
Registry later on. 

**Note**: Codespaces remembers your AWS connection. If you see your login information 
already filled in just confirm by pressing `[ENTER]`. 

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

Now, we are able to create a new docker image containing the updated version of our backend service 
and use AWS cli to push it to our elastic container registry:  

1. Go to https://console.aws.amazon.com/console/home
2. Log into your AWS account via web console using your credentials (if not signed in).
3. Choose AWS ECR service via global search or service overview (Container).
4. Choose your ECR service 
5. Click "View push commands" and follow the instructions using the Codespace terminal 
    - authenticate your Docker client to your registry
    - build docker image
    - tag your docker image to be able to push it to the repository
    - push docker image to ECR
6. Check the ECR for the new image with tag "latest"
    - Goto the AWS web console
    - Choose ECR service and select your ECR 

You should see (at least) to images inside your repository because we updated an already existing 
container image. One of them should have the image tag "latest" a timestamp (pushed at) corresponding
to the current time.

### Change configuration of AppRunner

When we have created our AppRunner service we set up the deployment mechanism to "automatic". This results 
in the container image that has just been pushed to ECR being automatically redeployed. To check this, just take 
a look at AppRunner service dashboard: 

1. Go to https://console.aws.amazon.com/console/home
2. Log into your AWS account via web console using your credentials (if not signed in).
3. Choose AppRunner service via global search or service overview (Compute).
4. Choose your AppRunner service instance
5. Scroll down the App Runner event logs. There should be several log entries indicating a redeployment.

Don't worry if you see a message like 

> "Your application stopped or failed to start. See logs for more information.  Container exit code: 1"

This is because we do not have connected our managed backend service with the dynamoDb table so far!

Ok, let's fix this and connect our backend service with our dynamoDB table. To do so we make use of the 
AppRunner configuration feature that allows to configure the managed services via environment 
variables: 

1. Choose your AppRunner service instance (as explained above)
2. Goto "Configuration" tab of your service
3. Click "Edit" button to change configuration
4. Scroll down to "Configure service"
5. Click "Add environment variable"
   - Environment variable name: DYNAMODB_TABLE
   - Environment variable value: name of your DynamoDB table
6. Click "Save changes" button

Switch back to "Logs" tab of your AppRunner service instance and observe the new entries 
related to the service update (this may take several minutes). 

### Quick-test the changes

To quick-test the changes just call one of the backend service APIs via AppRunner 
service from a browser of your choice:

    ```
    http:[APP_RUNNER_SERVICE_ADDRESS]/users
    ```

### Connect our frontend to the AppRunner service

After successfully being deployed it is time to finish this exercise and connect our frontend 
to the AppRunner service: 

1. Goto AppRunner service page and select your AppRunner instance
2. Copy the AppRunner service default domain
3. Go to the typescript file showcases.ts that can be found in ./frontend/src of your frontend project.
4. Replace the fake URL baseUrl: http://todo.invalid of the entry "3 - PaaS" with the valid URL of the 
backend. The result should look like.
    ```
    export const SHOWCASES: ShowcaseConfig = {
    "3 – PaaS": {
        baseUrl: "http:[APP_RUNNER_SERVICE_ADDRESS]",
    },
    ```

To test the AppRunner service and the connection from our frontend to it - including 
the DynamoDB table access - open the ok-forum app in a browser of your choice (URL see above) 
and select the showcase "3 – PaaS" in the dropdown.  Check if the ok-forum app works properly 
by clicking through the forums categories, topics and discussions. Add some topics and check 
the DynamoDB table for corresponding changes. 

**Note**: The AWS management console may display DynamoDB changes with a (huge) delay. So don't 
worry if you can not find your new entries immediately. Also check the log events of your AppRunner 
service instead. 

### Congratulation

With the help of the AppRunner service we managed to redesign (add a DynamoDB table) and redeploy
our backend service within minutes instead of hours. The only thing we had to do is updating the 
backend service itself and its related container image and push the image to the elastic container 
registry (ECR) afterwards.   

Next we will make use of serverless functions to react to cloud events. 

NO SEVER NO STRESS, SERVERLESS ... 

