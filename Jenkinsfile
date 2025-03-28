pipeline {
    agent any

    environment {
        // Define properties like test environment or credentials
        GITHUB_REPO = 'https://github.com/username/repository.git'
        TEST_ENV = 'staging'
        TEST_REPORT_DIR = 'target/test-classes'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the GitHub repository
                git url: "${env.GITHUB_REPO}", branch: 'main'
            }
        }

        stage('Setup') {
            steps {
                script {
                    // Set up any necessary environment (e.g., install dependencies)
                    sh 'echo "Setting up environment for ${env.TEST_ENV}"'
                    sh 'mvn install' // Or any other dependency setup
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests using properties or custom configurations
                    if (env.TEST_ENV == 'staging') {
                        sh 'mvn test' // Run tests in staging environment
                    } else {
                        sh 'mvn test -DskipTests=true' // Optionally skip tests in other environments
                    }
                }
            }
        }

        stage('Post Actions') {
            steps {
                // Archive the test results (assuming you're using Maven and JUnit)
                junit '**/target/test-*.xml' // Path to test result files
            }
        }
    }

    post {
        always {
            // Clean up or notify after build
            echo 'Build completed'
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
