#!/bin/sh
npm run build
rm -rf ../../react-course-hy-backend/build
cp -r build ../../react-course-hy-backend/
