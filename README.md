# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Step 1: Lift & Shift (simple version)

In this exercise, we will take our first steps in the cloud. To this end, we will provision 
an EC2 compute instance in the AWS cloud and then install our application on this backend and 
start it as an externally accessible service.

**Note:**
> Make sure you are on branch `1a_lift_and_shift`.

### Log in into the AWS Cloud

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

### Provision EC2 instance 

To provision and launch an EC2 instance we have to call the EC2 service configuration webpage first. 
There are several ways to do so: 

  - use global quick search and lookup for "EC2"
  - select EC2 service from service overview via "compute"
  - select EC2 service from "recently visited" (if available)

Use the EC2 service dashboard to launch a new instance: 

1. Click "Launch instance" button. This will bring you to a dedicated page 
to configure your future instance. 
2. Name and tags: mame your instance with the prefix of your animal, e.g. dog-ec2. 
3. Application and OS images: Select the most recent Amazon Linux as OS (should be preselected).
4. Instance type: select t3a.nano
5. Key pair: select "Proceed without a keypair"
6. Network settings:
- click "Select existing security group"
- select the predefined workshop security group "EC2"
7. Open "Advanced details" block:   
- select the predefined IAM instance profile "EC2"

**Note**: Leave everything els as is but feel free to read the different configuration topics and options. 

Finally, click "Launch instance". You will see a success page when everything done right. 

### Install backend service 

To install the service on the EC2 instance we have just provisioned, we first must connect to it. 
There are several ways to do so. At the moment the most simple way is to use the EC2 Session Manager. 

Connect to EC2 instance: 

1. Choose "Connect to instance" on success page.
2. Select Session Manager tab.
3. Click "connect" button. 
   After some seconds you should see a terminal window indicating that the connection was successful: 
    
    ```
    sh-5.2$ 
    ```

Type in the `whoami` command to check your EC2 user.  

Now we can start to install our backend on the just provisioned EC2 instance. Cause there 
is no java version installed so far, we have to do this first: 

1. Install Java 21:  

    ```
    sudo yum install java-21-amazon-corretto-headless`
    ```
2. Check installed version: 

    ```
    java -version
    ```
3. Goto home directory using `cd ~`.
4. Download our backend service to the EC2 instance via `wget`: 

    ```
    wget https://github.com/openknowledge/workshop-cloud/releases/download/v2/v2.jar
    ```

    If your run into a permission issue while trying to store the v2.jar file on the EC2 system 
you may not be in your home directory!
5. Start the backend service on port 80: 

    ```
    sudo java -jar v2.jar --server.port=80
    ```
   
When everything went well, you should see a corresponding Spring Boot output. 

### Quick-test EC2-based backend service

Great, our backend services seems to work. But to be sure we should call it via web browser, postman
or whatever. Therefor we have to look up the public available URL of our EC2 instance and call one of 
the REST-ful services of our backend:

1. Lookup backend URL via EC2 instances dashboard
   - choose YOUR EC2 instance  
   - copy the public IPv4 address or the public IPv4 DNS from the summary page
   - use this address to call one of the backend service APIs, e.g. 
   
    ```
    http://$DOMAIN/users
    http://$DOMAIN/categories
    ```

You should see some JSON data - forum users or forum categories - corresponding to your call.  

### Connecting frontend and backend

_DRAFT VERSION - CHANGES MY OCCUR DUE TO CODESPACES TLS ISSUE_

Finally, we want to connect our frontend to the cloud based backend service. As already shown in the 
first (on premise) exercise, to do so we have to reference the above evaluated URL of or backend service 
from the frontend showcases configuration typescript file `showcases.ts`:

1. Lookup backend URL via EC2 instances dashboard
    - choose YOUR EC2 instance
    - copy the public IPv4 address or the public IPv4 DNS from the summary page

2. Go to the typescript file `showcases.ts` that can be found in ./frontend/src of your frontend
   project. Replace the fake URL `baseUrl: http://todo.invalid` of the entry "1 – Lift & Shift" with
   the valid URL of the backend. The result should look like.

    ```
    export const SHOWCASES: ShowcaseConfig = {
        "1 – Lift & Shift": {
            baseUrl: "http:[ASIGNED_EC2_PUBLIC_IPv4_ADDRESS]",
        },
    ```
3. Open the ok-forum app in a browser of your choice (URL see above) and select the showcase "1 – Lift & Shift"
   in the dropdown.

4. Check if the ok-forum app works properly by clicking through the forums categories, topics and
   discussions.

**Note**: Don't forget to terminate your EC2 instance to save your / our money ;-) 

### Congratulations ...

Great! You have successfully completed your first steps in the cloud!

Now it's time dive DEEPER INTO THE CLOUD ...

