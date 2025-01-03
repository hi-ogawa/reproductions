import "systemjs";

const entryUrl = new URL(process.argv[2], import.meta.url).href;
System.import(entryUrl);
