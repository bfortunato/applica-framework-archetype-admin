
#!/bin/bash

export CURRENT_DIR=$(pwd)
export SOURCE=${CURRENT_DIR}/..
export PROJECT_ID=applica-cov-id
export MODULE=hsc-admin
export VERSION=1.0.1
export SERVICE_URL=http://34.107.251.231/api/

if [ -z ${APPLICA_CI_HOME+x} ]; then
    echo "[ERROR] Please set APPLICA_CI_HOME environment variable";
    exit 1
else
    echo APPLICA_CI_HOME=${APPLICA_CI_HOME};
fi

set -e

bash ${APPLICA_CI_HOME}/build-web.sh
bash ${APPLICA_CI_HOME}/test.sh
bash ${APPLICA_CI_HOME}/push.sh
bash ${APPLICA_CI_HOME}/cleanup.sh

kubectl apply -f ./kube
kubectl get pods