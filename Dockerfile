FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]