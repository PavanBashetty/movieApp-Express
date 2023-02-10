The main objective of our project is to do a compartive analysis between GCP and AWS.
Amongst other sub topics, we also included a web app implmentation in both cloud platform for comparision.
For this, we developed a full stack web app using Node.js, Vue.js, and MySQL.
Upon deploying the application successfully in local, we went through following steps to deploy it in GCP. [side note: AWS deployment was not done since the service is not free there]

1. Create MySQL instance on CLOUD SQL -> note down instance ID, instance IP address, instance/connection name, user name, password
2. Login to this MySQL instance in cloud shell -> Enter password when asked -> Create DB -> Create tables -> Insert data
3. Deploy Node.js code in app engine with following steps:
	- mention a service name in app.yaml for more clarity in app engine page 
	- Cloud Code extension for VS code [to integrate GCP services]
	- Write MySQL--NodeJS connection code with above MySQL instance credentials
	- gcloud init [fill out any follow up configurations] 
	- gcloud app deploy


-------------------------------------------------------------------------------

TO ESTABLISH A CONNECTION BETWEEN THE MYSQL INSTANCE AND A VM INSTANCE.
1. Connect this MySQL instance with the VM instance via external IP of VM instance so that any services operating within VM can access the database
	1. Get external IP of VM instance [compute engine -> VM instances]
	2. Go to created MySQL instance -> connections -> add network -> enter a name and external IP address of VM instance -> add and save it

