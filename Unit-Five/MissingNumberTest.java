import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class MissingNumberTest {

    @Test
    public void testMissingNumberThree_MissingNumber() {
        assertEquals(1, MissingNumber.findMissingNumberThree(new int[] { 2, 4, 3, 5, 6, 7, 10, 9, 8, 11 }, 11));
    }

    @Test
    public void testMissingNumberThree_MissingMaxNumber() {
        assertEquals(11, MissingNumber.findMissingNumberThree(new int[] { 1, 2, 4, 3, 5, 6, 7, 10, 9, 8 }, 11));
    }

    @Test
    public void testMissingNumberThree_MissingNone() {
        assertEquals(0, MissingNumber.findMissingNumberThree(new int[] { 1, 2, 4, 3, 5, 6, 7, 10, 11, 9, 8 }, 11));
    }

}
