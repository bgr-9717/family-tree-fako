# FAKO'S FAMILY TREE

A serverless family tree application built on AWS, designed to model family relationships using a graph-style DynamoDB single-table design.

---

## Description

Family Tree Fako is a full-stack serverless application that allows users to create, manage, and visualize family relationships.

The system evolves a traditional DynamoDB table into a **graph-based data model**, enabling efficient representation of parent, child, and sibling relationships.

---

## Architecture

- **Frontend:** React
- **Backend:** AWS Lambda (Node.js)
- **API:** Amazon API Gateway (HTTP API)
- **Database:** Amazon DynamoDB (single-table design)
- **Infrastructure:** AWS CDK (TypeScript)
- **Authentication (planned):** Amazon Cognito

---

## Tech Stack

- Node.js (LTS)
- TypeScript
- React
- AWS CDK v2
- Amazon DynamoDB
- Amazon API Gateway
- AWS Lambda

---

## Project Structure

```text
family-tree-fako/
├─ bin/                # CDK app entry point
├─ lib/                # CDK stacks & constructs
├─ lambda/             # Lambda function source code
├─ frontend/           # React frontend
├─ cdk.json
├─ package.json
├─ tsconfig.json
├─ README.md
└─ .gitignore

---


## Setup & Installation

### Prerequisites

Ensure the following are installed on your machine:

- Node.js (LTS)
- AWS CLI (configured with credentials)
- AWS CDK (v2)

---

# Verify installations:

```bash
node -v
aws --version
cdk --version


---

# Install AWS CDK(If not installed)

```bash
npm install -g aws-cdk
```

---

# Install project dependencies

```
npm install

---

# Bootstrap AWS environment (once per account/region)

```
cdk bootstrap

---

# Deploy the application

```
cdk deploy

---

# API Endpoints (example)

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | /members     | List family members     |
| POST   | /members     | Create family member    |
| GET    | /family-tree | Fetch family tree graph |
---

### Frontend

The frontend is built with React and consumes the API Gateway endpoints.
Family relationships are visualized using a tree/graph library.

---

# To run locally:

```bash
cd frontend
npm install
npm start

---

# Environment Variables

Backend Lambdas rely on environment variables such as:

TABLE_NAME=FakoFamilyTree

# Security Notes

IAM permissions follow least privilege

No secrets are committed to the repository

DynamoDB access is scoped per Lambda

# Future Improvements

Add Cognito authentication

Implement relationship traversal optimizations

Improve frontend tree visualization

Add automated tests









