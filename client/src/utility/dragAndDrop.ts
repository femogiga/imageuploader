

export const handleDragEnter = (e: Event) => {
    console.log((e.target as HTMLDivElement).style.backgroundColor = 'red')
    //dropZone.style.border = '1px solid black';

    console.log('i am in drop zone');
}


export const handleDragLeave = (e: Event) => {
    console.log((e.target as HTMLDivElement).style.backgroundColor = 'initial')
    console.log('i am leaving the drop zone');
}






