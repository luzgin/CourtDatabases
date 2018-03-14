package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.service.ComplaintsAdmService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class ComplaintAdmControllerTest {
    @Mock
    private ComplaintsAdmService complaintsAdmService;
    @InjectMocks
    ComplaintAdmController sut;

    @Test
    public void getComplaintsForDecree() {
        List<ComplaintsAdm> complaintsAdms = sut.getComplaintsForDecree(1);
    }
}