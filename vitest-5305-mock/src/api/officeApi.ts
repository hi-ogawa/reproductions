/* global Office */

export class OfficeApi {
  public getHost(): string {
    let retVal: string;
    switch (Office.context.host) {
      case Office.HostType.Word:
        retVal = "Word";
        break;
      case Office.HostType.Excel:
        retVal = "Excel";
        break;
      default:
        throw new Error("Not supported environment");
    }
    return retVal;
  }
}
