const axios = require("axios");
const crypto = require("crypto");

class WalmartService {
	constructor() {
		this.consumerId = "7785b9a8-40f4-48ac-bb68-41b79eea5fd4";
		this.privateKeyVersion = "1";
		this.privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAzSDv449f7LprTrz/2nKeAp+1dIaX/W94QdpRjcRW1wtwvQ1g
grJXG/UfuCJ9yZElEKJHAxv9MbIC/nQPpyDD2JzFNqI3XQEpOctQp60ntYhnB6Jo
pbZjiMAckuEV9KHpLMlFhpm8mpM+tpahUyX09MU+WeJBvxxK2ObviuHrqC7RiR3R
croKMMi0kI+cizHIyCW5v8CxAChxjaJckAvbcymvLspM5HPy9QU0RJxaPztSI+jA
Ws2P05GwCG6wnbJE3jQptv9jo7dU6WKkCSBoj7du3dM/bOL6rh+TcPnHPR/F6skp
9seTecqD6eHZp4/VooM1UnxLM5xQRyF7CWVywwIDAQABAoIBAE0ujnSOFubIweWP
galdJQ0RsMHWfsvSLGqCzdrMvGwPluzbYqvqlJIlajjraW71WP/oP1XxKxSOyUea
veUBlA8l9aJ36OLqs+tWD9P3eBB68WFS/5MSjGMA/f9aB9vTLBw44xshL3Dt5FPp
W2wgxQlwSeSiGGDjMVppkkosdXIC9ql6qC0HTimW//fDvA1SZEvcsHSLylGUWvPC
GYS3lsve2/ejdkl1Kyjusur6y0FTDPn+JrwYSuFv2f64bk7odXCvB9MuFeiNRxXL
JaUdhNfbHSmGs0hCGKj4iFGrVfrMyq6mPb9gbBllGHeHHsqDxmjGuw9DvuaQFJdg
0b2kMGECgYEA+ainyFLyXlt1opkiGHBCIDq24HtD2gvD3PzHM+KPwbupxfuLMN1K
KAHqM5ssSPU/UyZNH80g5q2Y28lw2PXO5F3a8M79K0lQZJkSdkLZeLMRTCQB3YAG
6FvFLzOWC6l7VVIF48Cr19M87ixH9XY4o5JP2BMgsRFJ8gq1ujZmPJECgYEA0la8
QqmJ81pvjTAv5zJyJhWOh7JigMCaOhlvmkPEjGB5Z0JDpaMRyLoXVuUSnCGgvRZ4
dQVSedpAV+5H0kj2EhPF1vlzYPLv5Ylw1bRjTMik4RjaQBo2hFeYA4XOC0O3fC2S
0baEQqz3hS+VxuZOjxD8+gp514xmtD4rz8optBMCgYEArD5W25eWjdDt3OtnoZK5
nIDFsSR6EJJzZCCl0r8pzVCK9gPw6RqTUfzYNxiEuiUxtk1DgoBEhcIZJvHYwGb+
gYHbTq6P7nBbXbxaB2thnKt2cKCbBNWSbnb6GPGvQIaCh7/aPmKsbG/Zpry4PLp+
oyOLoJi5wlAaQzpuXHWxnXECgYBrHoEB8hWvOX9WCBRdSfOYMaJEuTQxHeVtcUbE
6X5Pf1JUpAqPcFy+PQdl2YOAwB98LNVrwyodpGjgXxl0nnOzAR7gPGnmFdLWswgj
zZpEoGpXuLBttOvOuk1QffRRCEuJkiwTYUA6NJxZ18IPaXrYoW40aOFkRLyJTqBB
UlOqwQKBgQCqAXtJE6YQ+/tulw1kEVv7JUstlWUV/+RGigCAs818jvDB2P6kVSPg
emSm2DmoG/EmmhtQ+9yrAM+Hc8VDTmmyE7JazCeU1M/Y2AAxOG55kvON+Oa5abQE
HJrTIa6Ellfue4yCBfcBuN/7a4xA8ogKJiwJrCgUcopPuvIpeOxaRA==
-----END RSA PRIVATE KEY-----`;
	}

	generateSignature(consumerId, intimestamp, privateKeyVersion) {
		const dataToSign = `${consumerId}\n${intimestamp}\n${privateKeyVersion}\n`;
		const sign = crypto.createSign("RSA-SHA256");
		sign.update(dataToSign);
		sign.end();
		const signature = sign.sign(this.privateKey, "base64");
		return signature;
	}

	async fetchData(url, identifier) {
		const intimestamp = Date.now();
		const signature = this.generateSignature(this.consumerId, intimestamp, this.privateKeyVersion);

		const headers = {
			"WM_CONSUMER.ID": this.consumerId,
			"WM_CONSUMER.INTIMESTAMP": intimestamp,
			"WM_SEC.KEY_VERSION": this.privateKeyVersion,
			"WM_SEC.AUTH_SIGNATURE": signature,
		};

		try {
			const response = await axios.get(url, {
				headers: headers,
				params: {
					query: identifier, // Search by UPC or any other parameter
					format: "json",
				},
				timeout: 10000,
			});

			return response.data;
		} catch (error) {
			console.error("Error fetching data from Walmart API:", error.message);
			console.error("Error details:", error.response ? error.response.data : "No response data");
			return null;
		}
	}

	async searchWalmart(query, formattedType) {
		// Update the URL to include the "query" parameter instead of "upc"
		const productUrl = `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search`;
	
		const productData = await this.fetchData(productUrl, query);
	
		if (productData && productData.items && productData.items.length > 0) {
			// Take only the first product
			const product = productData.items[0];
			const productDetails = {
				name: product.name,
				price: product.salePrice || "N/A",
				image: product.mediumImage || "N/A",
				modelNumber: product.modelNumber || "N/A",
				upc: product.upc || "N/A",
			};

			if (formattedType === "upc") {
				if (!productDetails.upc || !productDetails.upc.includes(query)) {
					console.warn("Walmart item found does not contain the specified UPC");
					return null;
				}
			} else if (formattedType === "modelnumber") {
				if (!productDetails.modelNumber || !productDetails.modelNumber.includes(query)) {
					console.warn("Walmart item found does not contain the specified modelNumber");
					return null;
				}
			}			
	
			return productDetails; // Return details of the first product
		} else {
			console.warn("Product information not found from Walmart");
			return null;
		}
	}
}

module.exports = WalmartService;

const service = new WalmartService();
