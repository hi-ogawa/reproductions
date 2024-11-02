import oxc from "oxc-transform";

const result = oxc.transform(
	"test.ts",
	`\
declare let __TEST_DEFINE__: string;
console.log({ __TEST_DEFINE__ });
`,
	{
		define: {
			__TEST_DEFINE__: "1234",
		},
	},
);
console.log(result);
