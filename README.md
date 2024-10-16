# Integrated API Automation & Performance Testing with Apache JMeter

## Overview
This project includes a comprehensive JMeter script designed for the parallel execution of API automation and performance testing. 
The script covers a wide range of functionalities such as managing cookies, headers, cache, handling assertions, using dynamic variables, and automating various HTTP methods (GET, POST, PUT, PATCH, DELETE). 
Additionally, the project demonstrates how to measure the performance of APIs and generate detailed reports via the JMeter Command Line Interface (CLI).

### Features
1. HTTP Cookie Management: Handles cookies automatically for the session.
2. HTTP Header Management: Customizable HTTP headers for requests.
3. HTTP Cache Management: Efficient caching mechanism during request execution.
4. Duration Assertion: Ensures API responses are received within a specified time.
5. User-Defined Variables: Dynamic and reusable variables within the test plan.
6. Random Variables: Adds randomness to requests for better simulation.
7. Constant Timer: Controls the pacing of the requests.
8. JSON Extractor: Extracts data from JSON responses for further use.
9. JSON Assertion: Validates specific JSON data in API responses.
10. Response Body Assertion: Validates that the response body contains expected data.
11. Response Code Assertion: Checks for correct HTTP response codes (e.g., 200, 404, 500).
12. Response Header Assertion: Asserts the presence and value of response headers.
13. CSV Data-driven Testing: Reads POST request data from a CSV file and sends it as payloads.
14. Complete API Support: Supports testing of all HTTP methods including GET, POST, PUT, PATCH, DELETE.

### Performance Testing
1. Performance measurements are included to evaluate API response times under various loads.
2. Reports generated using JMeter CLI to provide visual insights into the performance metrics.

### How to Run the Script
1. Clone the repository.
2. Open the script through Apache JMeter and save it to a directory.
3. Navigate to the "command lines" directory inside the bin folder of that particular directory.
4. After that, open the terminal inside the directory
5. Run the script: `jmeter -n -t AutomationScript.jmx -l AutomationScript.jtl -e -o Reports`

The Reports folder will contain detailed HTML reports on performance metrics and API testing results.

### Requirements
1. Apache JMeter
2. Java JDK

### Some Screenshots of the Report

Screenshot 1

![SS1](https://github.com/user-attachments/assets/e0dcee59-c3e1-4d6e-b6f7-468e95ef5502)

Screenshot 2

![SS4](https://github.com/user-attachments/assets/ce53b038-5049-4816-b179-cb112ea26822)

Screenshot 3

![SS3](https://github.com/user-attachments/assets/39049afd-a298-4d17-82b1-f7eec06dd613)

Screenshot 4

![SS2](https://github.com/user-attachments/assets/6a37b841-49f3-4006-be71-d6f53ffc0405)
