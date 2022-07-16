module.exports.hello = async (event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "*woofs in spanish* 🐕",
      },
      null,
      2
    ),
  };
};
