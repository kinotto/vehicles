FROM node:alpine
COPY . .
RUN npm install --production
EXPOSE 9002
CMD ["node", "./build/bundle.js"]
