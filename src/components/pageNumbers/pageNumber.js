import { useEffect } from 'react';
import classes from './pageNumber.module.css'
export const PageNumbers = ({ lastPage, currentValue, hasNextValue, hasPrevValue, setPagesData, fetchAllPosts, firstPage, secondPage, thirdPage, fourthPage }) => {
    const firstValue = firstPage;
    const previousValue = 'prev'

    let secondValue = secondPage;
    let thirdValue = thirdPage;
    let fourthValue = fourthPage;
    let NextValue = 'next'
    let LastValue = lastPage
    // console.log('the first value and last value is: ',firstValue,LastValue);
    let currentPage = currentValue;
    let hasNext = hasNextValue;
    let hasPrev = hasPrevValue;

    let secondValueChanged = false;
    let thirdValueChanged = false;
    let fourthValueChanged = false;
    let secondValueToBeRemoved = false;
    let thirdValueToBeRemoved = false;
    let fourthValueToBeRemoved = false;

    let firstCurrentValue;
    if (firstValue === currentPage) {
        firstCurrentValue = currentPage;
    }
    //setting up second value for the page
    if (firstValue !== LastValue || secondValue === null) {
        if (hasNext) {
            secondValueChanged = true;
            // secondValue.setSecondPage(fourthValue.value+1);
        }
        else if (hasPrev) {
            secondValueChanged = true;
            // secondValue.setSecondPage(secondValue.value-3);
        }
    }
    else {
        secondValueToBeRemoved = true;
    }


    //setting up third value for the page
    if ((secondValue !== LastValue) || (!secondValue) || thirdValue === null) {
        if (secondValueToBeRemoved === true) {
            thirdValueToBeRemoved = true;
        }
        else if (hasNext) {
            thirdValueChanged = true;
        }
        else if (hasPrev) {
            thirdValueChanged = true;
        }
    }
    else {
        thirdValueToBeRemoved = true;
    }

    //setting up fourth value for the page
    if ((thirdValue !== LastValue) || (!thirdValue) || fourthValue === null) {
        if (thirdValueToBeRemoved) {
            fourthValueToBeRemoved = true;
        }
        else if (hasNext) {
            fourthValueChanged = true
        }
        else if (hasPrev) {
            fourthValueChanged = true
        }
    }
    else {
        console.log('fourth value to be removed');
        fourthValueToBeRemoved = true;
    }


    // console.log('the fourth value is: ', fourthValue);

    useEffect(() => {
        // console.log('use Effect running in pageNumber.js')
        if ((secondValueChanged || thirdValueChanged || fourthValueChanged) && hasNext) {
            setPagesData(prevState => {
                return {
                    ...prevState,
                    secondValue: fourthValue + 1,
                    thirdValue: fourthValue + 2,
                    fourthValue: fourthValue + 3,
                    hasNext: false,
                    hasPrev: false
                }
            })
        }

        else if ((secondValueChanged || thirdValueChanged || fourthValueChanged) && hasPrev) {
            setPagesData(prevState => {
                return {
                    ...prevState,
                    secondValue: secondValue - 3,
                    thirdValue: secondValue - 2,
                    fourthValue: secondValue - 1,
                    hasNext: false,
                    hasPrev: false
                }
            })
        }

        else if (secondValueToBeRemoved && thirdValueToBeRemoved && fourthValueToBeRemoved) {
            setPagesData(prevState => {
                return {
                    ...prevState,
                    secondValue: null,
                    thirdValue: null,
                    fourthValue: null
                }
            });
        }
        else if (thirdValueToBeRemoved && fourthValueToBeRemoved) {
            setPagesData(prevState => {
                return {
                    ...prevState,
                    thirdValue: null,
                    fourthValue: null
                }
            });
        }
        else if (fourthValueToBeRemoved) {
            setPagesData(prevState => {
                return {
                    ...prevState,
                    fourthValue: null
                }
            });
        }
        else if (firstValue === firstCurrentValue) {
            setPagesData(prevState => {
                if ((secondValue === null) && (thirdValue === null) && (fourthValue === null)) {
                    console.log('second, third and fourth value does not exist')
                    return {
                        ...prevState,
                        secondValue: null,
                        thirdValue: null,
                        fourthValue: null,
                    }
                }
                else if ((thirdValue === null) && (fourthValue === null)) {
                    console.log('third and fourth value does not exist')
                    return {
                        ...prevState,
                        secondValue: 2,
                        thirdValue: null,
                        fourthValue: null,
                    }
                }
                else if (fourthValue === null) {
                    console.log('fourth value does not exist')
                    return {
                        ...prevState,
                        secondValue: 2,
                        thirdValue: 3,
                        fourthValue: null,
                    }
                }
                else {
                    return {
                        ...prevState,
                        firstValue: 1,
                        secondValue: 2,
                        thirdValue: 3,
                        fourthValue: 4,
                    }
                }
            })
        }
    }, [secondValueChanged, thirdValueChanged, fourthValueChanged, hasNext, hasPrev, setPagesData, fourthValue, secondValue, secondValueToBeRemoved, thirdValueToBeRemoved, fourthValueToBeRemoved, firstCurrentValue, firstValue, thirdValue])



    // console.log('the third value and the last value is: ',thirdValue.value,LastValue.value);
    if ((firstValue === LastValue) || (secondValue === LastValue) || (thirdValue === LastValue) || (fourthValue === LastValue)) {

        LastValue = null;
        NextValue = false;
    }

    const pageNumbers = [firstValue,
        secondValue > 4 && previousValue,
        secondValue,
        thirdValue,
        fourthValue,
        ((LastValue > fourthValue + 1) && (fourthValue)) && NextValue,
        ((LastValue > fourthValue) && (fourthValue)) && LastValue];

    // console.log('the page number array is: ',PageNumbers);
    const modPageNumbers = pageNumbers.filter(page => page);
    // console.log('the modified page number array is: ',modPageNumbers);

    const fetchData = (value) => {
        let nextValue = false;
        let previousValue = false;
        if (value === 'next') {
            nextValue = true;
            value = fourthValue + 1;
        }
        else if (value === 'prev') {
            previousValue = true;
            value = secondValue - 1;
        }
        fetchAllPosts(value, nextValue, previousValue)
    }


    // console.log('the value of  current page is: ',props.currentPost.currentPage);
    let pageClasses = [];
    return (
        <div className={classes.pageNumber}>
            {modPageNumbers.map(page => {
                pageClasses = []
                pageClasses.push(classes.pageNumbers)

                if (currentPage === page) {
                    // console.log('the page.value equal to currentPage is: ',page.value);
                    pageClasses.push(classes.currentPage)
                }
                else {
                    //  console.log('the page.value not equal to currentPage is: ',page.value);
                    pageClasses.splice(1, 1);
                }
                if (page === 'prev' || page === 'next') {
                    pageClasses.push(classes.prevNext)
                }

                return <span onClick={() => fetchData(page)} className={pageClasses.join(" ")}
                    key={page}>{page}</span>
            })}
        </div>
    )
}