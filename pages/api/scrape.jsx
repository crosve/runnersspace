import puppeteer from "puppeteer";

const url =
  "https://www.runningwarehouse.com/Nike_Mens_Running_Shoes/catpage-MRSNIKE.html";

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(url);

    const evaluate = await page.evaluate(() => {
      const shoesData = Array.from(
        document.querySelectorAll(".cattable-wrap-cell.gtm_impression")
      );
      console.log("Number of shoes found:", shoesData.length);
      return shoesData.map((shoeinfo) => ({
        shoeUrl: shoeinfo
          .querySelector(".cattable-wrap-cell-imgwrap a")
          ?.getAttribute("href"),
        showImage: shoeinfo
          .querySelector(".cattable-wrap-cell-imgwrap a img")
          .getAttribute("src"),
        shoeName: shoeinfo.querySelector(
          ".cattable-wrap-cell-info .cattable-wrap-cell-info-name"
        ).innerText,
        shoePrice: shoeinfo.querySelector(
          ".cattable-wrap-cell-info .cattable-wrap-cell-info-price span"
        ).innerText,
      }));
    });
    console.log(evaluate);

    await browser.close();

    res
      .status(200)
      .json({ message: "Scraping completed successfully", data: evaluate });
  } catch (error) {
    console.error("Error occurred during scraping:", error);
    res.status(500).json({ error: "An error occurred during scraping" });
  }
}
