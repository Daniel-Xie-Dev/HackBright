import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

class AsynchronousChallengeOne{

    public static void main(String[] args) {
        String[][] data = new String [][]{
            {"Billy Blue", "Boston Marathon","76"},
            {"Billy Blue", "New York Marathon", "89"},
            {"Perry Pink", "Boston Marathon", "23"},
            {"Billy Blue","Salt Lake City Marathon", "42"},
            {"Perry Pink", "Salt Lake City Marathon", "112"},
            {"Gerald Green", "New York Marathon", "4"},
            {"Gerald Green", "Miami Marathon", "17"},
            {"Rachel Red", "Boston Marathon", "2"},
            {"Gerald Green", "Dallas Marathon", "18"},
            {"Billy Blue", "Dallas Marathon", "74"},
            {"Rachel Red", "New York Marathon", "84"}
        };

        printAverageOfCommonRaces(data);
        
    }


    public static void printAverageOfCommonRaces(String[][] input){
        HashMap<String, HashMap<String, Integer>> hashMap = new HashMap<>();

        for(String[] data : input){
            if(!hashMap.containsKey(data[0])){
                hashMap.put(data[0], new HashMap<>());
            }
            HashMap<String, Integer> innerHashMap = hashMap.get(data[0]);
            innerHashMap.put(data[1], Integer.parseInt(data[2]));
        }

        List<String> names = new ArrayList<>(hashMap.keySet());

        for(int i = 0; i < names.size() - 1; i++){

            HashMap<String, Integer> userMarathonHashMap = hashMap.get(names.get(i));

            for(int j = i + 1; j < names.size(); j++){
                
                HashMap<String, Integer> secondUserMarathonHashMap = hashMap.get(names.get(j));
                int matchingRaces = 0, firstUserScore = 0, secondUserScore = 0;

                for(String marathonNames : userMarathonHashMap.keySet()){
                    if(secondUserMarathonHashMap.containsKey(marathonNames)){
                        matchingRaces++;
                        firstUserScore += userMarathonHashMap.get(marathonNames);
                        secondUserScore += secondUserMarathonHashMap.get(marathonNames);
                    }
                }

                if(matchingRaces != 0){
                    System.out.println("\"" + names.get(i) + ": " + firstUserScore / matchingRaces);
                    System.out.println("\"" + names.get(j) + ": " + secondUserScore / matchingRaces + "\n");
                }

            }
        }

        // for(String keyString : hashMap.keySet()){
        //     System.out.println(keyString);
        //     System.out.println(hashMap.get(keyString));
        // }
    }
}