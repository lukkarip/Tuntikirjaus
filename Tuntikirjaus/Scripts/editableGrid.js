
$(document).ready(function () {

    var $TABLE = $('#table');
    var $BTN = $('#export-btn');
    var $EXPORT = $('#export');

    $('.table-add').click(function () {
        var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
        $TABLE.find('table').append($clone);
    });

    $('.table-remove').click(function () {
        $(this).parents('tr').detach();
    });

    $('.table-up').click(function () {
        var $row = $(this).parents('tr');
        if ($row.index() === 1) return; // Don't go above the header
        $row.prev().before($row.get(0));
    });

    $('.table-down').click(function () {
        var $row = $(this).parents('tr');
        $row.next().after($row.get(0));
    });

    // A few jQuery helpers for exporting only
    jQuery.fn.pop = [].pop;
    jQuery.fn.shift = [].shift;

    $BTN.click(function () {
        var $rows = $TABLE.find('tr:not(:hidden)');
        var headers = [];
        var data = [];

        // Get the headers (add special header logic here)
        $($rows.shift()).find('th:not(:empty)').each(function () {
            headers.push($(this).text().toLowerCase());
        });

        // Turn all existing rows into a loopable array
        $rows.each(function () {
            var $td = $(this).find('td');
            var h = {};

            // Use the headers from earlier to name our hash keys
            headers.forEach(function (header, i) {

                var kokeilu = $td.eq(i).find('option:selected').val()

                if (kokeilu !== "" && kokeilu !== undefined) {
                    h[header] = kokeilu;
                } else {
                    h[header] = $td.eq(i).text();
                }

            });

            data.push(h);
        });

        // Output the result
        $EXPORT.text(JSON.stringify(data));
    });


    $('select.kategoria').change(function () {

        var valittuKategoria = $(this).find('option:selected').val();
        var valittuTehtavalista = [];

        switch (valittuKategoria) {
            case "Medbit - Yleiset":
                valittuTehtavalista = HaeMedbitYleiset();
                break;
            case "Medbit - Poissaolot":
                valittuTehtavalista = HaeMedbitPoissaolot();
                break;
            case "Kommunikaatiopalvelut - Yleiset":
                valittuTehtavalista = HaeKommunkaatiopalvelutYleiset();
                break;
            case "Kommunikaatiopalvelut - Ylläpito":
                valittuTehtavalista = HaeKommunkaatiopalvelutYllapito();
                break;
            case "Kommunikaatiopalvelut - Projektit":
                valittuTehtavalista = HaeKommunkaatiopalvelutProjektit();
                break;
        }


        var select = $('<select/>', {
            'class': 'form-control tehtava'
        }).change(function () {

        });

        for (var i = 0; i < valittuTehtavalista.length; i++) {
            select.append($('<option/>', {
                'text': valittuTehtavalista[i]
            }));
        }

        $(this).parent().next().append(select);
    })

});

function HaeMedbitYleiset() {
    return ["Henkilöstöpalaveri", "Kehityskeskustelu", "Koulutus - sisäinen", "Koulutus - ulkoinen", "Osastokokous", "Perjantain aamupalaveri"]
}

function HaeMedbitPoissaolot() {
    return ["Henkilökohtainen meno", "Lapsen sairaus", "Sairausloma", "Saldovapaa"]
}

function HaeKommunkaatiopalvelutYleiset() {
    return ["Koodarit-tiimi - Viikkopalaveri", "SharePoint-työryhmä - Viikkopalaveri", "Tiimipalaveri", "Videoneuvottelu - Viikkopalaveri"]
}

function HaeKommunkaatiopalvelutYllapito() {
    return ["VSSHP Internet-sivut", "SATSHP Internet-sivut", "KTO Internet-sivut, Project Server tuki"]
}

function HaeKommunkaatiopalvelutProjektit() {
    return ["Ohjepankki - Määrittely", "Ohjepankki - Suunnittelu", "Ohjepankki - Toteutus", "Ohjepankki - Testaus", "Ohjepankki - Koulutus",
            "VSSHP Intran uudistus - Määrittely", "VSSHP Intran uudistus - Suunnittelu", "VSSHP Intran uudistus - Toteutus", "VSSHP Intran uudistus - Testaus", "VSSHP Intran uudistus - Koulutus",
    ]
}


