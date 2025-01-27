# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Step 4: Serverless Functions (Lambda)

During the last exercise we have build up step-by-step a cloud based scalable backend service 
making use of various different cloud managed services and components. 

In this exercise we will use serverless functions - aka [AWS Lambda](https://aws.amazon.com/lambda/) - to add 
additional functionality to our application setup without any changes to the existing backend code. 

During this exercise you will learn how to:

- Log into the AWS Cloud 
- Create and change Lambda functions
- Trigger Lambda functions with a cloud event 
- Monitor Lambda functions

### Log into the AWS Cloud

**Note**: This step is only necessary if you are not already logged in.

First of all we have to connect to the AWS Cloud:

1. Go to https://console.aws.amazon.com/console/home
2. Select "IAM user sign in" if not already preselected
3. Use the user information provided to you to sign in
    - Account ID: [WORKSHOP ACCOUNT ID]
    - IAM username: [YOUR ANIMAL]
    - Password: [YOUR ANIMAL PWD]

After successfully logged in you should see the AWS CLoud main dashboard.

**Note**: Make sure the region in the upper right corner of the browser window
is set to "Europe (Frankfurt)" aka eu-central-1.

### Create a Lambda function 

A serverless function - aka AWS Lambda - can be used to add behaviour to our current 
setup without changing the backend service itself. Normally you will use such a functions, 
whenever you want to do "something" in reaction to a cloud event. 

So let's say we want to listen to if and what new topics have been added to our forum 
and trigger some action afterwards. To do this we can use any DynamoDB change in our table 
as a trigger for our to be implemented Lambda function. 

To create a Lambda function we have to call the AWS Lambda dashboard first. There are
several ways to do so:

- use global quick search and lookup for "Lambda"
- select Lambda service from service overview via "Compute"
- select Lambda service from "recently visited" (if available)

Use the Lambda dashboard to create and configure a new Lambda function:

1. Click "Create a function". This will lead you to the "Create function" page.
2. Fill in the following values (leave everything else as is)
    - Select "Author from Scratch" 
    - Name function with your animal as prefix, e.g. dog-serverless-function
    - Select "Node.js ..." as runtime
    - Select "Use an existing role" for "execution role"
      - Existing role: Lambda 
3. Click "Create function" button

You will see a success page showing your serverless function when done everything right. Test your
Lambda function with the help of the web interface: 

1. Switch to "Test" tab 
2. Click "Test" button 

You should see an output indicating a successful function invocation. 

### Set DynamoDB event as Lambda trigger

Next, we want to set a trigger - changes in our DynamoDB table - for the serverless function: 

1. Click "+ Add Trigger"
2. Select "DynamoDb" as source of the trigger configuration
3. Select YOUR DynamoDB table as trigger 
4. Click "Add" button to create the trigger

You should see the overview page of your serverless function showing DynamoDB as a trigger afterwards. 

### Change serverless function 

Now, it is time to adapt the code of our serverless function and to deploy it afterwards. 

1. Select "Code" tab
2. Replace `//TODO implement` with following code 

    ``` typescript
     console.log("Hello <your-username>!") // YOUR USER NAME HERE 
    ``` 
3. Click "Test" button left to the code editor to test the changes 
4. Click "Deploy" button left to the code editor to make the function available 

### Connect our frontend to the AppRunner service

After successfully being deployed it is time to finish this exercise and connect our frontend
to the AppRunner service and add some topics to trigger and test the serverless function:

1. Goto AppRunner service page and select your AppRunner instance
2. Copy the AppRunner service default domain
3. Go to the typescript file showcases.ts that can be found in ./frontend/src of your frontend project.
4. Replace the fake URL baseUrl: http://todo.invalid of the entry "4 - Lambda" with the valid URL of the
   backend. The result should look like.

    ```typescript
    export const SHOWCASES: ShowcaseConfig = {
        ...
        "4 – Lambda": {
            baseUrl: "http://[APP_RUNNER_SERVICE_ADDRESS]",
        },
        ...
    }
    ```
To test the Lambda we have to insert new data into the DynamoDB table. This can be done 
by adding one or more topics to our ok-forum application. So, open the ok-forum app in 
a browser and add some topics. 

### Monitor Lambda function  

Ok, we have added one or more topics to our DynamoDB. But how to check if 
our serverless function was triggered and has worked properly? 

1. Open Lambda dashboard
2. Select "Functions" in Lambda menu
3. Select YOUR function from functions overview page 
4. Select "Monitor" tab of your function management page
5. Click "View CloudWatch logs" to open function specific log
6. Look for "Hello ... " which is the output of your `console.log`

Feel free to play around with the Lambda function, and it's DynamoDB triggered event. For example, 
try to print out the individual elements of the DynamoDB event, like the topic name, in the log.

You can use 

  ```typescript
  console.log(JSON.stringify(event, null, 2));
  ```

or 

  ```typescript
  if (record.eventName === 'INSERT') {
    console.log(`- Description: ${record.dynamodb.NewImage.description.S}`);
    console.log(`- Title: ${record.dynamodb.NewImage.title.S}`);
  }
  ```
to log detailed event information inside your Lambda function. 

Great, we managed to monitor our lambda function and its DynamoDB trigger. But let us
assume we are only interested in INSERT events but not in UPDATE or DELETE events of 
our DynamoDB table. Fortunately there is a way to set a filter criteria to our DynamoDB
trigger: 

1. Open Lambda dashboard
2. Select "Functions" in Lambda menu
3. Select YOUR function from functions overview page
4. Click DynamoDB trigger icon in diagram
5. Select YOUR trigger (checkbox)
6. Click "Edit" button.
7. Collapse "Advanced settings"
8. Insert filter criteria

  ```
  { "eventName" :  [ "INSERT" ] }
  ```
9. Click "Save" button

**Note**: Saving the changed trigger configuration will redeploy your Lambda function automatically.

To test the new configuration add a new topic. You can do this with the help of 
our ok-forum frontend or directly by copying and pasting an existing topic item
to the DynamoDB table (don't forget to change the `pk`). Go to the CloudWatch log
of the Lambda function and search for a corresponding INSERT entry - there 
should be one. 

Delete the DynamoDB entry afterwards with the help of the AWS DynamoDB dashboard of 
your DynamoDB table. Go to the CloudWatch log of the Lambda function and search for 
a corresponding REMOVE entry - there should be NONE.

### Congratulations 

... 
