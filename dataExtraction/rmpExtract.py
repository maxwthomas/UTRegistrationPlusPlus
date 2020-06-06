from selenium import webdriver
import time

driver = webdriver.Firefox("/home/max/UTRegistrationPlusPlus/dataExtraction")
driver.get("https://utdirect.utexas.edu/ctl/ecis/results/search.WBX")


#driver.find_element_by_id("username").send_keys("mwt568")
#driver.find_element_by_id("password").send_keys("6mC44Yc6Vqgc3xh")
#driver.find_element_by_class_name("button").click()
#time.sleep(2)
#for page in range(1):
#    for row in range(2,12):
#        newPath = "/html/body[@class='minWidth']/div[@id='utd_container']/div[@id='content']/div[@id='service_content']/div[@id='results-view']/table/tbody/tr[" + str(row) + "]/td[1]/a"
#        driver.find_element_by_xpath(newPath).click()
#        time.sleep(1)
#        driver.back()
#        time.sleep(1)
#    driver.find_element_by_xpath("/html/body[@class='minWidth']/div[@id='utd_container']/div[@id='content']/div[@id='service_content']/div[@id='results-view']/div[1]/div[@class='page-forward']/form/input[8]").click()
#results = driver.find_element_by_id("results-view")
#print(results)
