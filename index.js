class Person {

    constructor(startLevel){
        this.curLevel = startLevel;
        this.startLevel = startLevel;
    }

    getCurrentLevel (){
        return this.curLevel;
    }

    setLevel (level){
        this.curLevel = level;
    }

    getTotalDonation (totalLevel = 0, startDonation = 0, increments = 0){
        let total = 0;

        for(let i = 0; i < totalLevel; i++) {
            let curMultiplier = Math.pow(increments, i);

            total += startDonation * curMultiplier;
        }

        return total;
    }

    getTotalDonationToAdmin (totalLevel = 0, startDonation = 0, increments = 0) {
        let startLevel = this.startLevel;

        let total = 0;

        for(let i = 0; i < totalLevel; i++) {
            let curMultiplier = Math.pow(increments, i);

            if(i > totalLevel - 2 - startLevel){
                total += startDonation * curMultiplier;
            }
        }

        return total;
    }
}


/**
 * Events
 * */

$('#calculate-btn').click(function (e) {
    e.preventDefault();

    let peopleArray = [];

    let noOfBranches = parseInt($('#no-of-branches').val());
    let noOfTotalTiers = parseInt($('#no-of-total-tiers').val());
    let startingDonation = parseInt($('#starting-donation').val());
    let incrementPercentage = parseInt($('#increment-percentage').val());

    for(let i = 0; i < noOfTotalTiers; i++) {
        peopleArray.push([]);

        let curTierPeople = Math.pow(noOfBranches, noOfTotalTiers - 1 - i);

        for(let j = 0; j < curTierPeople; j++) {
            peopleArray[i].push(new Person(i));
        }
    }

    let total = 0;
    let totalAdmin = 0;

    let testArray = [];

    for(let i = 0; i < peopleArray.length; i++) {
        let curTier = peopleArray[i];
        testArray.push([]);

        for(let j = 0; j < curTier.length; j++) {
            total += curTier[j].getTotalDonation(noOfTotalTiers, startingDonation, incrementPercentage);
            totalAdmin += curTier[j].getTotalDonationToAdmin(noOfTotalTiers, startingDonation, incrementPercentage);

            testArray[i].push({
                total:curTier[j].getTotalDonation(noOfTotalTiers, startingDonation, incrementPercentage),
                adminTotal:curTier[j].getTotalDonationToAdmin(noOfTotalTiers, startingDonation, incrementPercentage)

            })
        }
    }

    console.log(testArray);

    console.log(peopleArray);

    $('#total').text(total);
    $('#total-admin').text(totalAdmin);
});
