# Postman Collections for Microservices

This directory contains Postman collections for all microservices in the ride-hailing platform.

## Main Collections

### 🎯 **All-Services.postman_collection.json** (Recommended)
**Complete unified collection** with all APIs from all services organized by service. This is the main collection for comprehensive API testing.

### 🚀 **Working-Flow.postman_collection.json** (Quick Testing)
**Minimal collection** with only the essential APIs needed to test the complete end-to-end trip flow. Includes automatic variable saving for seamless flow testing.

## Individual Service Collections

1. **Rider-Service.postman_collection.json** - Rider Service API

## Environment

**Microservices-Environment.postman_environment.json** - Contains base URLs for all services

### Default URLs (Local Development)
- Rider Service: `http://localhost:5005`

## How to Import

### Recommended: Import Main Collections
1. Open Postman
2. Click **Import** button
3. Import **All-Services.postman_collection.json** (complete collection)
4. Import **Working-Flow.postman_collection.json** (quick flow testing)
5. Import **Microservices-Environment.postman_environment.json** (environment variables)

### Option 2: Import Individual Collections
1. Open Postman
2. Click **Import** button
3. Select the collection file you want to import
4. Repeat for each service

### Import Environment
1. In Postman, click the **Environments** icon (left sidebar)
2. Click **Import**
3. Select `Microservices-Environment.postman_environment.json`
4. Select the environment when making requests

## Using the Working Flow Collection

The **Working-Flow** collection is designed for quick end-to-end testing:

1. **Automatic Variable Management**: IDs (rider_id, driver_id, trip_id) are automatically saved from responses
2. **Sequential Flow**: Follow the numbered folders (1-5) in order
3. **Health Checks**: Included at the end to verify all services are running

### Quick Start with Working Flow:
1. Run all Health Checks first to verify services
2. **Step 1**: Create Rider (rider_id auto-saved)
3. **Step 2**: Register Driver (driver_id auto-saved)
4. **Step 3**: Create Trip (trip_id auto-saved)
5. **Step 4**: Complete Trip (triggers payment and notification)
6. **Step 5**: Verify final trip status

The collection uses Postman's test scripts to automatically extract and save IDs from responses, so you don't need to manually copy/paste IDs between requests.

### Rider Service
- **Base URL**: `http://localhost:5005/v1`
- **Endpoints**:
  - Rider CRUD operations
  - Payment instrument management
  - Account settings
  - Request/Cancel trip

## Typical Workflow

### Complete Trip Flow (Use Working-Flow Collection)
1. **Create Rider** (Rider Service) - `rider_id` auto-saved
2. **Register Driver** (Driver Service) - `driver_id` auto-saved (driver is active/available by default)
3. **Create Trip** (Trip Service) - Rider creates trip, status: `REQUESTED`, `trip_id` auto-saved
4. **View Available Trips** (Trip Service) - Driver views all trips with `REQUESTED` status
5. **Accept Trip** (Trip Service) - Driver accepts trip, status: `ACCEPTED`, driver becomes unavailable
6. **Start Trip** (Trip Service) - Start the trip, status: `STARTED`
7. **End Trip** (Trip Service) - End trip with distance, status: `ENDED` → processes payment → status: `COMPLETE`/`UNPAID`, driver becomes available again
8. **Payment Service** - Charges payment and publishes receipt event to Kafka
9. **Notification Service** - Receives Kafka event, fetches rider details from Rider Service, and sends email notification

### Manual Workflow (Using All-Services Collection)
Follow the same steps but manually copy IDs between requests.

## Testing Tips

1. **Use Environment Variables**: Import and select the environment file to easily switch between local/Docker/production URLs
2. **Update Variables**: Modify collection variables or environment variables to match your setup
3. **Check Service Health**: Use health check endpoints to verify services are running
4. **Kafka Testing**: For Notification Service, use Kafka tools (like Kafka Console Consumer) to verify events are being published

## Docker Compose URLs

If running via Docker Compose, services communicate internally using service names:
- `http://rider-service:5005`

For external access (from Postman), use `localhost` with the mapped ports as shown in the environment file.

## Notes

- All collections include example request bodies
- Update path variables (like `:driver_id`, `:trip_id`, `:id`) with actual values