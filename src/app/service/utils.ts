export class Utils{

    cellIdToCellNumber(cellId: string): number{
        return parseInt(cellId.replace("cell-", ""), 10);
    }

    cellNumberToCellId(cellNumber: number): string{
        return "cell-" + cellNumber;

    }



}