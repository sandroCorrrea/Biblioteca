var confirmDelete = (event) => {
    var option = confirm('EXCLUIR');

    if (option)
    {

    }
    else
    {
        event.preventDefault();
    }
}

var confirmDrop = (event) => 
{
    var option = confirm("Deseja Realmente Alugar o Livro: ");

    if (option)
    {

    }
    else
    {
        event.preventDefault();
    }
}