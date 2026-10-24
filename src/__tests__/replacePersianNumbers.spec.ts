import replacePersianNumbers from "../utils/persian/replacePersianNumbers";

describe("replacePersianNumbers", () => {
  it("should replace Persian numbers with English numbers", () => {
    const input = "۱۲۳۴۵۶۷۸۹۰";
    const result = replacePersianNumbers(input);
    expect(result).toEqual("1234567890");
  });

  it("should replace Arabic-Indic numbers with English numbers", () => {
    expect(replacePersianNumbers("١٤٠٣/٠٥/١٢ - ۱۴")).toEqual("1403/05/12 - 14");
  });
});
