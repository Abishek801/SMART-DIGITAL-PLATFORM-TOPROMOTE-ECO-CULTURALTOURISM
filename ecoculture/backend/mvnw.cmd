@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@echo off
set MAVEN_OPTS=-Xmx512m

set MVNW_REPOURL=https://repo.maven.apache.org/maven2
set MVNW_USERNAME=
set MVNW_PASSWORD=

set distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip

SET SCRIPT_DIR=%~dp0
SET MAVEN_PROJECTBASEDIR=%SCRIPT_DIR%

SET WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper
SET WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar
SET WRAPPER_PROPERTIES=%WRAPPER_DIR%\maven-wrapper.properties
SET DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar

IF EXIST %WRAPPER_JAR% (
    java -classpath %WRAPPER_JAR% org.apache.maven.wrapper.MavenWrapperMain %* -Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%
) ELSE (
    mvn %*
)
