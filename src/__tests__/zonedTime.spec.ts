import { fromWallClock, toWallClock } from "../utils/common/zonedTime";

const clock = (time: number, timeZone: string) => {
  const { year, month, day, hours, minutes } = toWallClock(time, timeZone);
  return `${year}-${month}-${day} ${hours}:${String(minutes).padStart(2, "0")}`;
};

describe("zonedTime", () => {
  it("reads both sides of Iran's 2020 daylight saving change exactly", () => {
    // Clocks jumped from 24:00 to 01:00 on 2020-03-21 (Tehran), at 2020-03-20T20:30:00Z.
    expect(clock(Date.UTC(2020, 2, 20, 20, 29), "Asia/Tehran")).toBe("2020-3-20 23:59");
    expect(clock(Date.UTC(2020, 2, 20, 20, 30), "Asia/Tehran")).toBe("2020-3-21 1:00");
    expect(clock(Date.UTC(2020, 2, 20, 12, 0), "Asia/Tehran")).toBe("2020-3-20 15:30");
  });

  it("round-trips wall-clock readings across many days and stays exact after the offset cache resets", () => {
    const start = Date.UTC(1990, 0, 1, 9, 15);
    for (let day = 0; day < 10_050; day += 1) {
      const time = start + day * 86_400_000;
      expect(fromWallClock(toWallClock(time, "Asia/Tehran"), "Asia/Tehran")).toBe(time);
    }
    expect(clock(Date.UTC(2024, 7, 1, 21), "Asia/Tehran")).toBe("2024-8-2 0:30");
  });
});
