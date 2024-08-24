const formatDate=(isoString)=> {
    const date = new Date(isoString);
    
    // Define options for date and time formatting
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    // Convert date to a human-readable format
    return date.toLocaleDateString(undefined, options);
}

export default formatDate;