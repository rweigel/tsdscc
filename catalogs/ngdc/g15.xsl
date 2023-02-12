<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:v2="http://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2" version="1.0">
  <xsl:output omit-xml-declaration="yes" method="html" version="1.1" encoding="iso-8859-1"/>
  <xsl:template match="v2:netcdf">
    <xsl:copy>
      <xsl:copy-of select="@*"/>
      <xsl:copy-of select="//v2:attribute[@name='start_date']"/>
      <xsl:copy-of select="//v2:attribute[@name='end_date']"/>
      <hr/>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="v2:variable">
    <variable>
      <xsl:for-each select="*">
        <xsl:choose>
          <xsl:when test="./@name='missing_value'">
            <xsl:attribute name="fill_value">
              <xsl:value-of select="@value"/>
            </xsl:attribute>
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="{@name}">
              <xsl:value-of select="@value"/>
            </xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
    </variable>
    <xsl:apply-templates/>
  </xsl:template>
</xsl:stylesheet>
