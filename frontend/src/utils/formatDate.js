const formatDate = (date)  => {
    const unformattedDate = new Date(date * 1000);

    // Format the date and time as a string
    const formattedDateTime = unformattedDate.toLocaleString();
    return formattedDateTime;
}

export default formatDate;