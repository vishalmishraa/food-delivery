# Food delivery API

A REST API backend for a food delivery app using Node.js. The primary focus is on a dynamic pricing module to calculate the total cost of food delivery based on various factors.

## Key Features
#### Dynamic Delivery Cost Calculation:
Calculates delivery costs based on:
 - Zone
 - Item type (perishable/non-perishable)
 - Distance
 - Base distance and price
 - Per km price
 - Returns the total delivery price in the API response.

#### Database Management:
- Uses PostgreSQL database with well-defined relationships between Organization, Item, and Pricing tables.
- Implements input validation for API payloads.

#### API Documentation:
- Provides comprehensive Swagger UI documentation for easy understanding and consumption.

#### Code Quality:
- Adheres to Airbnb's style guide for code readability and maintainability.
## Tech Stack

**Server:** Node, Express 

**Languange :** Typescript

**Database :**  PostgreSQL by NeonDB, Drizzle-ORM
 

## Installation

### 1. Clone the repository:

```bash
  git clone https://github.com/vishalmishraa/food-delivery.git

  cd food-delivery
```
    
### 2. Install dependencies:

```bash
 npm install
```

### 3. Create a `.env` file:
- Copy the provided `.env.example` file to `.env` .
- Fill in the required environment variables, including your NeonDB for PostgreSQL API keys and database URL.

### 4. Configure the database:

```bash
 drizzle-kit post:pg
```

### 5. Build the project:

```bash
 npm run build
```

### 6. Start the server: 

```bash
 npm start
```

## API Reference

- Refer to the Swagger UI documentation at `http://localhost:3000`.

- A comprehensive overview of all API endpoints, request/response formats are given below.

### Calculate Cost

```http
  POST /api/calculateCost
```
- #### Request body
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `zone` | `string` | **Required**. zone  |
| `organization_id` | `integer` | **Required**. organization ID  |
| `item_type` | `string` | **Required**. Type of Item  |
| `item_description` | `string` | **Required**. Description of item  |
| `total_distance` | `integer` | **Required**. Total distance to deliver  |

```bash
{
  "zone": "central",
  "organization_id": 5,
  "item_type": "perishable",
  "item_description": "cake",
  "total_distance": 12
}
```

### Organization

 #### Get All Organization

```http
  POST /api/getAllOrganization
```
- #### Response body

```bash
{
  "success": "success",
  "data": [
    {
      "id": 10,
      "name": "chocoBakery"
    }
  ]
}
```

 #### Add new Organization 

 ```http
  POST /api/newOrganization
```
- #### Request body
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `organization_name` | `string` | **Required**. new Organization name  |

```bash
{
  "organization_name": "chocoBakery"
}
```

- #### Response body

```bash
{
  "success": "success",
  "message": "Organization Added"
}
```
### Item

 #### Get All Item

```http
  POST /api/getAllItem
```
- #### Response body

```bash
{
  "success": "success",
  "data": [
    {
      "id": 10,
      "item_type": "perishable",
      "description": "cake",
      "organization_id": {
        "id": 10,
        "name": "chocoBakery"
      }
    }
  ]
}
```

 #### Add new Item 

 ```http
  POST /api/addItem
```
- #### Request body
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `organization_id` | `integer` | **Required**. new Organization Id  |
| `description` | `string` | **Required**. new Item Description  |
| `type` | `string` | **Required**. Type of Item ( perishable/non-perishable )  |

```bash
{
  "organization_id": 5,
  "description": "cake",
  "type": "perishable"
}
```

- #### Response body

```bash
{
  "success": "success",
  "message": "Organization Added"
}
```

### Pricing

 #### Get All Princg

```http
  POST /api/getAllPricing
```
- #### Response body

```bash
{
  "success": "success",
  "data": [
    {
      "id": 10,
      "organization_id": 5,
      "item_id": 8,
      "zone": "central",
      "base_distance_in_km": 1,
      "km_price": 1,
      "fix_price": 1
    }
  ]
}
```

 #### Add new Pricing Structure 

 ```http
  POST /api/addPricing
```
- #### Request body
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `organization_id` | `integer` | **Required**. new Organization Id  |
| `Item_id` | `integer` | **Required**.  Item ID  |
| `base_distance_in_km` | `integer` | **Required**. base distance for delivery in KM |
| `km_price` | `number (double precision)` | **Required**. per KM price |
| `fix_price` | `integer` | **Required**. fixed price |


```bash
{
  "organization_id": 5,
  "item_id": 5,
  "zone": "central",
  "base_distance_in_km": 5,
  "km_price": 1.5,
  "fix_price": 10
}
```

- #### Response body

```bash
{
  "success": "success",
  "message": "Pricing structure Added successfully"
}
```

