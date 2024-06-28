from mysql

RUN mkdir -p /home/db

WORKDIR /home/db

RUN cd /home/db

COPY ./database/ .

ENTRYPOINT [ "tail", "-f", "/dev/null" ]