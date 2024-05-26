pipeline {
    agent any
    
    tools{
        nodejs 'nodejs21'  
    } 
/*   
    environment{
        SCANNER_HOME= tool 'sonar-scanner'
    }*/
    stages {
        stage('git-checkout') {
            steps {
                git branch: 'main', credentialsId: 'Wafacg', url: 'https://github.com/Wafacg/pfe1246.git'
            }
        }
        stage('Install Dependecies') {
            steps {
                dir('Backend'){
                  sh 'npm install'
                }
                dir('Frontend'){
                  sh 'npm install'
                }
                dir('Admin'){
                  sh 'npm install'
                  sh'npm install react-router-dom'
                }
            }
        }
/*
        stage('Sonar Analysis') {
            steps {
                sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.url=http://192.168.45.120:9000/ -Dsonar.login=squ_b8a0a8deff1f6a1e636eff0a5e712eade98674b8 -Dsonar.projectName=pfe_project \
                   -Dsonar.sources=. \
                   -Dsonar.projectKey=pfe_project '''
            }
        }*/
        stage('Docker Build & Push ') {
            steps {
                   script {
                        sh "docker-compose build -d" 
                        withDockerRegistry(credentialsId:'wafachabbi' , toolName: 'docker') {
                            sh "docker push wafachabbi/backend:latest"
                            sh "docker push wafachabbi/frontend:latest"
                            sh "docker push wafachabbi/admin:latest"
                        }
                   } 
            }
        }
        stage('Deploy') {
            steps {
                script { // Run Docker image
                    sh "docker-compose up -d" 
                }
            }
        }
    }
}
