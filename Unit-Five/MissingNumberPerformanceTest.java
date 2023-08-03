import org.junit.Test;

public class MissingNumberPerformanceTest {
    private int[] missingNumber = new int[] { 2, 4, 3, 5, 6, 7, 10, 9, 8, 11 };
    private int[] missingMax = new int[] { 1, 2, 4, 3, 5, 6, 7, 10, 9, 8 };
    private int[] missingNone = new int[] { 1, 2, 4, 3, 5, 6, 7, 10, 11, 9, 8 };
    private int max = 11;

    @Test(timeout = 1000)
    public void testFindMissingNumberOne_Performance() {
        for (int i = 0; i < 1000000; i += 1) {
            MissingNumber.findMissingNumberOne(missingMax, max);
            MissingNumber.findMissingNumberOne(missingNumber, max);
            MissingNumber.findMissingNumberOne(missingNone, max);
        }
    }

    @Test(timeout = 40)
    public void testFindMissingNumberTwo_Performance() {
        for (int i = 0; i < 1000000; i += 1) {
            MissingNumber.findMissingNumberTwo(missingMax, max);
            MissingNumber.findMissingNumberTwo(missingNumber, max);
            MissingNumber.findMissingNumberTwo(missingNone, max);
        }
    }

    @Test(timeout = 25)
    public void testFindMissingNumberThree_Performance() {
        for (int i = 0; i < 1000000; i += 1) {
            MissingNumber.findMissingNumberThree(missingMax, max);
            MissingNumber.findMissingNumberThree(missingNumber, max);
            MissingNumber.findMissingNumberThree(missingNone, max);
        }
    }
}
