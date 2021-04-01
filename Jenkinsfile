pipeline {
  agent {
        docker { image 'node:14-alpine' }
  }
  environment {
    CURRENT_WORKSPACE = "${env.WORKSPACE}"
    AWS_CARBON8_IP = credentials('AWS_CARBON8_IP ')
    CURRENT_WORKSPACE_BOOK = "${env.WORKSPACE}/public/"
    DEST_PATH = "/srv/sites/agilitycms-develop.carbon8dev.com"
    STAGING_PATH = '/srv/sites/agilitycms.carbon8dev.com'
    HOME = '.'
    LHCI_BUILD_CONTEXT__CURRENT_BRANCH = "${env.BRANCH_NAME}"
    LHCI_BUILD_CONTEXT__EXTERNAL_BUILD_U = "${env.BUILD_URL}"
    SCANNER_QUBE_HOME = tool 'SonarQubeScanner'
	  OWNER = "9thWonder"
    PR_INDEX = env.BRANCH_NAME.replace('PR-', '')
    REPO = "agilitycms-09-2020"
	  OFFICE365_WEBHOOK = credentials('1874cd82-e930-4d9c-9a47-2fc633333320')

    AGILITY_GUID='80dc0987-be84-4405-a572-aba199832f68'
    AGILITY_API_KEY_DEV='defaultPreview.6ddcb15cfad15bc5b0df1da3cd019f5dc009d1e9a11fa83c2cbdb7886c687dba'
    AGILITY_API_ISPREVIEW_DEV = true

    AGILITY_API_KEY_LIVE='defaultLive.6c41579315f979e432227763d6092059ae2a36968a4a02c7177c13ae194a3b4e'
    AGILITY_API_ISPREVIEW_LIVE = false
  }
  options {
    disableConcurrentBuilds()
  }
  stages {
    stage('Build') {
	  when {
        branch 'develop'
      }
      steps {
		catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
			echo "Begin Build"
			sh "npm i"
			sh "cd  $CURRENT_WORKSPACE && AGILITY_GUID=$AGILITY_GUID AGILITY_API_KEY=$AGILITY_API_KEY_DEV AGILITY_API_ISPREVIEW=$AGILITY_API_ISPREVIEW_DEV npm run build"
			echo "End Build"
		}
      }
    }
	stage('Deploy to Develop') {
	  when {
        branch 'develop'
      }
      steps {
        echo "Deploying Develop Branch"
        sshagent(credentials: ['AWS_CARBON8_DEMO']) {
          sh 'rsync -avhze "ssh -o StrictHostKeyChecking=no" "$CURRENT_WORKSPACE_BOOK"  jenkins_9wdev@$AWS_CARBON8_IP:$DEST_PATH'
        }
		echo "End Deploy"
      }
    }


    stage('Deploy Frondend to Staging') {
      when {
        branch 'staging'
      }
      steps {
        sshagent(credentials: ['AWS_CARBON8_DEMO']) {
          sh 'ssh -o StrictHostKeyChecking=no -l  jenkins_9wdev $AWS_CARBON8_IP "cp -R /srv/sites/agilitycms-develop.carbon8dev.com/* /srv/sites/agilitycms.carbon8dev.com/"'
        }
      }
    }
	stage("Scan Performance with Lighthouse CI") {
        when {
			branch 'develop'
		}
		steps {
		  script{

			  env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
			  env.LHCI_BUILD_CONTEXT__COMMIT_MESSAGE = "${env.GIT_COMMIT_MSG} - ${env.BUILD_URL}"

			}
			echo "${env.LHCI_BUILD_CONTEXT__COMMIT_MESSAGE}"
			sh 'lhci autorun'
		}
    }
		stage('Sonarqube Analysis') {
        when {
          anyOf {
            branch 'develop'
            allOf {
              environment name: 'CHANGE_TARGET', value: 'develop'
              branch 'PR-*'
            }
          }
        }
        steps {
            script {
              withSonarQubeEnv("9thWonder SonarQube") {
                sh "${SCANNER_QUBE_HOME}/bin/sonar-scanner"
              }
              def qg = waitForQualityGate()
              if(qg.status != "OK"){
                echo "${qg.status}"
                error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
              }
            }
        }
    }

  }
}