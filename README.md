# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Step 4: Serverless Functions (Lambda)

During the last exercise we have build up step-by-step a cloud based scalable backend service making use of various 
different cloud managed services and components. 

In this exercise we will use serverless functions - aka [AWS Lambda](https://aws.amazon.com/lambda/) - to add 
additional functionality to our application setup without any changes to the existing backend code. 

During this exercise you will learn how to:

- Create and change Lambda functions
- Trigger Lambda functions with a cloud event 
- Monitor Lambda functions




We want to do "something" whenever a new topic is added to our forum.
To do this we use any DynamoDB change in our table as trigger for our Lambda function.

1. Create a new Lambda function

    - Go to the Lambda page in the AWS Management console
    - Click on "Create Function"
    - Select "Author from Scratch" and use Node.js as runtime
    - Name it after your user
    - Under permissions choose "Use existing role" and select the role "Lambda"
    - Create the function

2. Add DynamoDB changes as trigger for our Lambda function

    - Click on "Add Trigger" and select DynamoDB as source
    - Select the table you created in exercise `3_paas`
    - Create the trigger

3. Change the code

    - Use `console.log("Hello <your-username>!")` to print the event to console
    - Click on deploy to change the function

4. Connect the frontend to AppRunner service

    - Adjust the showcase "4 – Lambda" in showcases.ts
    - Set the base URL using the default domain of your app runner service
    - Select showcase "4 – Lambda" and check if the app works properly

5. Create a new topic using the frontend

6. Check if your Lambda was invoked

    - On the Lambda management page click on the "Monitor" tab
    - Click on "View CloudWatch logs"
    - Try to find the output of your `console.log`

7. Play around a with Lambda and DynamoDB

    - Inspect the event further and try to extract things like the topic name
    - Print the important information
