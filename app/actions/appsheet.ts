"use server";

export async function getFoodBankData() {
  const appId = process.env.APPSHEET_APP_ID;
  const accessKey = process.env.APPSHEET_ACCESS_KEY;
  const tableName = "Sunway Food Bank"; 

  const response = await fetch(
    `https://www.appsheet.com/api/v2/apps/${appId}/tables/${encodeURIComponent(tableName)}/Action`,
    {
      method: "POST",
      headers: {
        "ApplicationAccessKey": accessKey as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Action: "Find", 
        Properties: {
          Locale: "en-US",
          Timezone: "Asia/Kuala_Lumpur",
        },
        Rows: [], 
      }),
    }
  );

  // FIXED: Added curly braces to ensure this only runs if the response fails
  if (!response.ok) {
    const errorBody = await response.text();
    console.error("AppSheet API Reject Reason:", errorBody); 
    throw new Error("Failed to fetch AppSheet data");
  }

  return response.json();
}