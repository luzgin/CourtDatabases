package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.CardAdm;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTSectPr;

import java.io.FileOutputStream;

public class CardWordDocument {
    public static void main(CardAdm card) {
        try {
            FileOutputStream outputStream = new FileOutputStream("D:/card.docx");
            // создаем модель docx документа,
            // к которой будем прикручивать наполнение (колонтитулы, текст)
            XWPFDocument docxModel = new XWPFDocument();
            CTSectPr ctSectPr = docxModel.getDocument().getBody().addNewSectPr();

            // создаем обычный параграф, который будет расположен слева,
            // будет синим курсивом со шрифтом 25 размера
            XWPFParagraph bodyParagraph = docxModel.createParagraph();
            bodyParagraph.setAlignment(ParagraphAlignment.RIGHT);
            XWPFRun paragraphConfig = bodyParagraph.createRun();
            paragraphConfig.setItalic(true);
            paragraphConfig.setFontSize(25);
            // HEX цвет без решетки #
            paragraphConfig.setColor("06357a");
            paragraphConfig.setText(
                    "Prologistic.com.ua - новые статьи по Java и Android каждую неделю. Подписывайтесь!"
            );

            //create table
            XWPFTable table = docxModel.createTable();

            //create first row
            XWPFTableRow tableRowOne = table.getRow(0);
            tableRowOne.getCell(0).setText("col one, row one");
            tableRowOne.addNewTableCell().setText("col two, row one");
            tableRowOne.addNewTableCell().setText("col three, row one");

            //create second row
            XWPFTableRow tableRowTwo = table.createRow();
            tableRowTwo.getCell(0).setText("col one, row two");
            tableRowTwo.getCell(1).setText("col two, row two");
            tableRowTwo.getCell(2).setText("col three, row two");

            //create third row
            XWPFTableRow tableRowThree = table.createRow();
            tableRowThree.getCell(0).setText("col one, row three");
            tableRowThree.getCell(1).setText("col two, row three");
            tableRowThree.getCell(2).setText("col three, row three");

            docxModel.write(outputStream);
            outputStream.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("Успешно записан в файл");
    }

}
