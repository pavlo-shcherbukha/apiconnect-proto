FROM prx-prod-nexus-as1.pravex.ua:8083/nodejs/node:18-rhel

#USER root
#COPY ./diy-model-srvc/ /tmp/src
#RUN chown -R 1001:0 /tmp/src
#USER 1001
#RUN /usr/libexec/s2i/assemble
#CMD /usr/libexec/s2i/run

USER 0
COPY ./diy-model-srvc/ /tmp/src
RUN chown -R 1001:0 /tmp/src

#Sonarqube verify
ENV SONAR_SCANNER_VERSION=5.0.1.3006
ENV SONAR_SCANNER_HOME=${HOME}/.sonar/sonar-scanner-${SONAR_SCANNER_VERSION}-linux
RUN curl --create-dirs -sSLo ${HOME}/.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}-linux.zip && \
  unzip -o ${HOME}/.sonar/sonar-scanner.zip -d ${HOME}/.sonar/ 
ENV PATH=${SONAR_SCANNER_HOME}/bin:${PATH}
ENV SONAR_SCANNER_OPTS="-server"
ENV SONAR_TOKEN=sqp_42bed901e5e68748331572fb2ff05b3487110fd3
RUN cp -r /tmp/src /opt/app-root
RUN sonar-scanner \
  -Dsonar.projectKey=diy-model-srvc \
  -Dsonar.sources=/opt/app-root/src \
  -Dsonar.host.url=http://prod-sonarqube-as1.pravex.ua:9000 && \
  rm -rf /opt/app-root/src

RUN /usr/libexec/s2i/assemble
CMD /usr/libexec/s2i/run
