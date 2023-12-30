FROM oven/bun
ENV APP_ROOT /project

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD ./project ${APP_ROOT}

RUN bun install
RUN bun run build

ENV HOST 0.0.0.0
