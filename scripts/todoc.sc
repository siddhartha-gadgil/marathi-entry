import ammonite.ops._
val file = pwd / "data" / "qgis-localization-marathi-strings.tsv"
val l = read.lines(file)
val arrs = l.map(_.split("\t"))

import $ivy.`org.odftoolkit:odfdom-java:0.8.7`
import $ivy.`xml-apis:xml-apis:1.3.04`
import $ivy.`xml-resolver:xml-resolver:1.2`
import $ivy.`org.apache.odftoolkit:simple-odf:0.8.2-incubating`
import org.odftoolkit.simple.TextDocument;
import org.odftoolkit.simple.table.Cell;
import org.odftoolkit.simple.table.Table;
import org.odftoolkit.simple.text.list.List

def targ(a: Array[String]): String = if (a.size > 2) a(2) else ""
def st(a: Array[String]): String = if (a.size > 1) a(1) else ""

def mkDoc(arrvec: Vector[Array[String]], m: Int) = {
  val outputOdt = TextDocument.newTextDocument()
  val table = outputOdt.addTable(arrvec.size, 4)

  def writeRow(a: Array[String], n: Int) = {
    table.getCellByPosition(0, n).setStringValue(a(0))
    table.getCellByPosition(1, n).setStringValue(st(a))
    table.getCellByPosition(2, n).setStringValue(targ(a))
    }

  arrvec.zipWithIndex.toIterator.foreach{case (a, n) => writeRow(a, n)}
  val indx = f"$m%03.0f"
  outputOdt.save(s"data/qgis-docs/qgis-marathi${indx}.odt")
}


val gpd = arrs.grouped(100).toVector
