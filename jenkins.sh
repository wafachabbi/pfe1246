#!/bin/bash

# Update package lists and install dependencies
sudo apt update -y
sudo apt install openjdk-11-jre -y
sudo apt install curl -y

curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update -y 

# Install Jenkins
sudo apt-get install jenkins -y
# Start Jenkins service
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins

# Print Jenkins URL
echo "Access Jenkins at: http://localhost:8080"
# Print Jenkins pwd
cat /var/lib/jenkins/secrets/initialAdminPassword